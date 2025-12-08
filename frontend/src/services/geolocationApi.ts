import { api } from './api';
import { Office } from './officeService';

export interface GeolocationOfficesResponse {
    success: boolean;
    city: string | null;
    offices: Office[];
    matchedByCity: boolean;
}

// Helper function to get user's city from ip-api (called from browser)
export const getUserCity = async (): Promise<string | null> => {
    try {
        const response = await fetch('http://ip-api.com/json/?fields=status,city,regionName');
        const data = await response.json();

        if (data.status === 'success') {
            return data.city || data.regionName || null;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user city:', error);
        return null;
    }
};

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

