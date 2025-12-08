import { officeService } from './office.service';
import { Ioffice } from '../models/Office';

interface IpApiResponse {
    status: 'success' | 'fail';
    message?: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

export interface GeolocationResult {
    city: string;
    country: string;
    countryCode: string;
    region: string;
    latitude: number;
    longitude: number;
}

export interface OfficesForLocationResult {
    geolocation: GeolocationResult | null;
    offices: Ioffice[];
    matchedByCity: boolean;
}

export class GeolocationService {
    private readonly IP_API_URL = 'http://ip-api.com/json';

    async getLocationByIp(ip: string): Promise<GeolocationResult | null> {
        try {
            // Skip private/local IPs - return null to trigger fallback
            if (this.isPrivateIp(ip)) {
                console.log(`Skipping private IP: ${ip}`);
                return null;
            }

            const response = await fetch(`${this.IP_API_URL}/${ip}?fields=status,message,country,countryCode,region,regionName,city,lat,lon`);
            const data = await response.json() as IpApiResponse;

            if (data.status === 'fail') {
                console.error(`ip-api error: ${data.message}`);
                return null;
            }

            return {
                city: data.city,
                country: data.country,
                countryCode: data.countryCode,
                region: data.regionName,
                latitude: data.lat,
                longitude: data.lon
            };
        } catch (error) {
            console.error('Error fetching geolocation:', error);
            return null;
        }
    }

    async getOfficesForLocation(ip: string): Promise<OfficesForLocationResult> {
        const geolocation = await this.getLocationByIp(ip);

        // If we got geolocation, try to find offices in that city
        if (geolocation) {
            const cityOffices = await officeService.getOfficesByCity(geolocation.city);

            if (cityOffices.length > 0) {
                return {
                    geolocation,
                    offices: cityOffices,
                    matchedByCity: true
                };
            }
        }

        // Fallback: return all offices if no city match or no geolocation
        const allOffices = await officeService.getAllOffices();
        return {
            geolocation,
            offices: allOffices,
            matchedByCity: false
        };
    }

    private isPrivateIp(ip: string): boolean {
        // Check for common private/local IPs
        if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
            return true;
        }

        // Check for private IPv4 ranges
        const parts = ip.split('.').map(Number);
        if (parts.length === 4) {
            // 10.x.x.x
            if (parts[0] === 10) return true;
            // 172.16.x.x - 172.31.x.x
            if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
            // 192.168.x.x
            if (parts[0] === 192 && parts[1] === 168) return true;
        }

        return false;
    }
}

export const geolocationService = new GeolocationService();
