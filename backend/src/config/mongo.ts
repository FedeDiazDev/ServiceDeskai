import mongoose from 'mongoose';
import { UserModel } from '../models/User';

export const connectDB = async () => {
    const MONGO_URI = process.env.MONGODB_URI as string;
    
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado exitosamente');
        
        // Crear usuario de ejemplo si no existe
        await createDefaultUser();
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

const createDefaultUser = async () => {
    try {
        const existingUser = await UserModel.findOne({ email: 'admin@deskai.com' });
        
        if (!existingUser) {
            await UserModel.create({
                name: 'Admin',
                surname: 'User',
                email: 'admin@deskai.com',
                password: 'admin123', // TODO: Hashear con bcrypt en producción
                role: 'admin'
            });
            console.log('Usuario admin creado: admin@deskai.com');
        }
    } catch (error) {
        console.error('Error creando usuario por defecto:', error);
    }
};
