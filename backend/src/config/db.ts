import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User';
import { OfficeModel } from '../models/Office';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
        
    await seedDatabase();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    const existingUsers = await UserModel.countDocuments();
    
    if (existingUsers > 0) {
      console.log('Database already seeded');
      return;
    }


    const offices = await OfficeModel.insertMany([
      {
        name: 'Oficina Central',
        location: 'Calle Principal 123, Piso 1',
        phone: '+34 911 234 567'
      },
      {
        name: 'Oficina Norte',
        location: 'Avenida del Norte 456, Piso 2',
        phone: '+34 911 234 568'
      },
      {
        name: 'Oficina Sur',
        location: 'Plaza del Sur 789, Piso 3',
        phone: '+34 911 234 569'
      },
      {
        name: 'Oficina Este',
        location: 'Paseo del Este 321, Piso 1',
        phone: '+34 911 234 570'
      }
    ]);
    console.log(' offices created');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await UserModel.create({
      name: 'Admin',
      surname: 'Principal',
      email: 'admin@deskai.com',
      password: hashedPassword,
      role: 'admin',
      office: offices[0]._id
    });
    console.log('Admin created: admin@deskai.com');

    const normalUsers = [
      { name: 'Juan', surname: 'García', email: 'juan@deskai.com', office: offices[0]._id },
      { name: 'María', surname: 'López', email: 'maria@deskai.com', office: offices[1]._id },
      { name: 'Carlos', surname: 'Martínez', email: 'carlos@deskai.com', office: offices[2]._id },
      { name: 'Ana', surname: 'Fernández', email: 'ana@deskai.com', office: offices[3]._id }
    ];

    for (const user of normalUsers) {
      await UserModel.create({
        ...user,
        password: hashedPassword,
        role: 'user'
      });
    }
    console.log('normal users created ');

    const serviceUsers = [
      { name: 'Pedro', surname: 'Sánchez', email: 'pedro.service@deskai.com', office: offices[0]._id },
      { name: 'Laura', surname: 'Ruiz', email: 'laura.service@deskai.com', office: offices[1]._id },
      { name: 'Miguel', surname: 'Hernández', email: 'miguel.service@deskai.com', office: offices[2]._id },
      { name: 'Sofia', surname: 'Díaz', email: 'sofia.service@deskai.com', office: offices[3]._id }
    ];

    for (const user of serviceUsers) {
      await UserModel.create({
        ...user,
        password: hashedPassword,
        role: 'service'
      });
    }
    console.log('service desk users created ');

    console.log('Database seeding completed!');
    console.log('');
    console.log('Users credentials:');
    console.log('   Admin:   admin@deskai.com');
    console.log('   Users:   juan@deskai.com, maria@deskai.com, carlos@deskai.com, ana@deskai.com');
    console.log('   Service: pedro.service@deskai.com, laura.service@deskai.com, miguel.service@deskai.com, sofia.service@deskai.com');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};