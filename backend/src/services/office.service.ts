import { Ioffice, OfficeModel } from '../models/Office';
import { CreateOfficeInput, UpdateOfficeInput } from '../schemas/office.schema';

export class OfficeService {
    async createOffice(data: CreateOfficeInput): Promise<Ioffice> {
        const office = await OfficeModel.create(data);
        if (!office) {
            throw new Error('OFFICE_CREATION_FAILED');
        }
        return office;
    }

    async getAllOffices(): Promise<Ioffice[]> {
        const offices: Ioffice[] = await OfficeModel.find();
        if (!offices) {
            throw new Error('OFFICES_NOT_FOUND');
        }
        return offices;
    }

    async getOfficeById(id: string): Promise<Ioffice> {
        const office: Ioffice | null = await OfficeModel.findById(id);
        if (!office) {
            throw new Error('OFFICE_NOT_FOUND');
        }
        return office;
    }

    async getOfficesByCity(city: string): Promise<Ioffice[]> {
        // Case-insensitive search for offices in the specified city
        const offices: Ioffice[] = await OfficeModel.find({
            city: { $regex: new RegExp(`^${city}$`, 'i') }
        });
        return offices;
    }

    async updateOffice(id: string, data: UpdateOfficeInput): Promise<Ioffice> {
        const office = await OfficeModel.findByIdAndUpdate(id, data, { new: true });
        if (!office) {
            throw new Error('OFFICE_NOT_FOUND');
        }
        return office;
    }

    async deleteOffice(id: string): Promise<Ioffice> {
        const office = await OfficeModel.findByIdAndDelete(id);
        if (!office) {
            throw new Error('OFFICE_NOT_FOUND');
        }
        return office
    }
}

export const officeService = new OfficeService();
