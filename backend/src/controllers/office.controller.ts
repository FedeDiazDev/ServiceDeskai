import { Request, Response } from 'express';
import { officeService } from '../services/office.service';
import { CreateOfficeInput, UpdateOfficeInput } from '../schemas/office.schema';

// POST /offices
export const createOffice = async (req: Request, res: Response) => {
    try {
        const data = req.body as CreateOfficeInput;
        const office = await officeService.createOffice(data);
        res.status(201).json(office);
    } catch (error: any) {
        if (error.message === 'OFFICE_CREATION_FAILED') {
            res.status(400).json({ message: 'Office creation failed' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /offices
export const getAllOffices = async (req: Request, res: Response) => {
    try {
        const offices = await officeService.getAllOffices();
        res.status(200).json(offices);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /offices/:id
export const getOfficeById = async (req: Request, res: Response) => {
    try {
        const office = await officeService.getOfficeById(req.params.id);
        res.status(200).json(office);
    } catch (error: any) {
        if (error.message === 'OFFICE_NOT_FOUND') {
            res.status(404).json({ message: 'Office not found' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT /offices/:id
export const updateOffice = async (req: Request, res: Response) => {
    try {
        const data = req.body as UpdateOfficeInput;
        const office = await officeService.updateOffice(req.params.id, data);
        res.status(200).json(office);
    } catch (error: any) {
        if (error.message === 'OFFICE_NOT_FOUND') {
            res.status(404).json({ message: 'Office not found' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE /offices/:id
export const deleteOffice = async (req: Request, res: Response) => {
    try {
        await officeService.deleteOffice(req.params.id);
        res.status(200).json({ message: 'Office deleted successfully' });
    } catch (error: any) {
        if (error.message === 'OFFICE_NOT_FOUND') {
            res.status(404).json({ message: 'Office not found' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};
