import { Request, Response } from 'express';
import { UserModel } from '../models/User';

export const registerUser = async (req: Request, res: Response) => {

    const {name, surname, email, password, role} = req.body;
    const encryptedPassword = password; // TODO: Hashear con bcrypt en producción
    try{
        const existingUser = await UserModel.findOne({ email });
        if (existingUser){
            return  res.status(400).json({ message: 'El usuario ya existe' });
        }
        const newUser = new UserModel({
            name,
            surname,
            email,
            encryptedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }catch(error){
        console.error('Error registrando usuario:', error);
        res.status(500).json({ message: 'Error registrando usuario' });
    }

};

export const loginUser = async (req: Request, res: Response) => {};