import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db';
import apiRouter from './routes/index';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT;

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
} ));
app.use(express.json());
app.use(cookieParser());


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

app.use('/api', apiRouter);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

startServer();
