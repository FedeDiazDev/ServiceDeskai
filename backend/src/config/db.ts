import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;


if (!MONGO_URI) {
  throw new Error('MONGODB_URI no está definido en las variables de entorno');
}
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};