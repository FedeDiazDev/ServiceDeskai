import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT ;

app.use(cors());
app.use(express.json());


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
