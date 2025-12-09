import { api } from './api';
import { Office } from './officeService';

export interface GeolocationOfficesResponse {
    success: boolean;
    city: string | null;
    offices: Office[];
    matchedByCity: boolean;
}

export interface UserLocation {
    city: string | null;
    latitude?: number;
    longitude?: number;
    source: 'gps' | 'ip' | 'none';
}

export const getUserCityFromIP = async (): Promise<string | null> => {
    try {
        const response = await fetch('http://ip-api.com/json/?fields=status,city,regionName');
        const data = await response.json();

        if (data.status === 'success') {
            return data.city || data.regionName || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user city from IP:', error);
        return null;
    }
};

export const getUserLocation = async (): Promise<UserLocation> => {
    if ('geolocation' in navigator) {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 300000
                });
            });

            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
                    { headers: { 'User-Agent': 'ServiceDeskAI/1.0' } }
                );
                const data = await response.json();
                const city = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality;

                return {
                    city: city || null,
                    latitude,
                    longitude,
                    source: 'gps'
                };
            } catch {
                return {
                    city: null,
                    latitude,
                    longitude,
                    source: 'gps'
                };
            }
        } catch (error) {
            console.log('GPS denied or failed, falling back to IP geolocation');
        }
    }

    // Fallback to IP-based geolocation
    const city = await getUserCityFromIP();
    return {
        city,
        source: city ? 'ip' : 'none'
    };
};

// Legacy export for backwards compatibility
export const getUserCity = getUserCityFromIP;

export const geolocationApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOfficesForCity: build.query<GeolocationOfficesResponse, string | undefined>({
            query: (city) => ({
                url: '/geolocation/offices',
                params: city ? { city } : undefined
            }),
        }),
    }),
});

export const { useGetOfficesForCityQuery } = geolocationApi;
