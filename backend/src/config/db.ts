import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from '../models/User';
import { TicketModel } from '../models/Ticket';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;


if (!MONGO_URI) {
  throw new Error('MONGODB_URI no está definido en las variables de entorno');
}
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB conectado exitosamente');
        
    await createAdminUser();
    // await createDefaultTicket();
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

const createAdminUser = async () => {
    try {
        const existingUser = await UserModel.findOne({ email: 'admin@deskai.com' });
        
        if (!existingUser) {
            await UserModel.create({
                name: 'Admin',
                surname: 'User',
                email: 'admin@deskai.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('Usuario admin creado: admin@deskai.com');
        }
    } catch (error) {
        console.error('Error creando usuario por defecto:', error);
    }
};

// const createDefaultTicket = async () => {
//     try {
//         const existingTicket = await TicketModel.findOne({ title: 'Ticket de ejemplo' });
        
//         if (!existingTicket) {
//             await TicketModel.create({
//                 title: 'Ticket de ejemplo',
//                 description: 'Este es un ticket de ejemplo creado por defecto.',
//                 status: 'open',
//                 priority: 'medium'
//             });
//             console.log('Ticket de ejemplo creado');
//         }
//     } catch (error) {
//         console.error('Error creando ticket por defecto:', error);
//     }
// };