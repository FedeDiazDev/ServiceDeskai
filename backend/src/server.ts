import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT ;
const MONGO_URI = process.env.MONGODB_URI as string;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend está funcionando' });
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Ruta de prueba funcionando' });
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();
