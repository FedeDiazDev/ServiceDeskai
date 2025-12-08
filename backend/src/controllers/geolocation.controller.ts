import { Request, Response } from 'express';
import { officeService } from '../services/office.service';

export const getOfficesForLocation = async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string | undefined;

        if (city) {
            const cityOffices = await officeService.getOfficesByCity(city);

            if (cityOffices.length > 0) {
                return res.status(200).json({
                    success: true,
                    city,
                    offices: cityOffices,
                    matchedByCity: true
                });
            }
        }

        const allOffices = await officeService.getAllOffices();
        res.status(200).json({
            success: true,
            city: city || null,
            offices: allOffices,
            matchedByCity: false
        });
    } catch (error: any) {
        console.error('Geolocation controller error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching offices'
        });
    }
};
