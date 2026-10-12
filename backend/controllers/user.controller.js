import { userModel } from "../modelos/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
    createUserValidator,
    loginValidator,
    updateNameValidator,
} from "../validators/user.validators.js";

/*
    controller para crear el usuario
*/
export const createUser = async (req, res) => {
    try {
        const data = createUserValidator.parse(req.body);
        const password = await bcrypt.hash(data.password, 10);
        const newUser = new userModel({ ...data, password });
        await newUser.save();

        res.status(201).json({
            message: 'usuario creado correctamente'
        });
    } catch (error) {
        const status = error.name === 'ZodError' || error.code === 11000 ? 400 : 500;
        res.status(status).json({
            message: 'Error al guardar el usuario',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = loginValidator.parse(req.body);
        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT_SECRET no está configurado' });
        }

        const token = jwt.sign(
            { id: user._id.toString(), rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(error.name === 'ZodError' ? 400 : 500).json({
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Id de usuario inválido', error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').sort({ created_at: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};

export const updateUserName = async (req, res) => {
    try {
        const { nombre } = updateNameValidator.parse(req.body);
        const user = await userModel.findByIdAndUpdate(
            req.params.id,
            { nombre },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar el nombre',
            error: error.message
        });
    }
};


export const deleteUser = async (req , res) => {
    try{
        const userId = req.params.id;
        const userDeleted = await userModel.findByIdAndDelete(userId); 
        
        res.json(userDeleted);
    }
    catch (error) {
        res.status(500).json({
            message: 'Hubo un error al intentar eliminar el usuario',
            error: error.code
        });
    }
};

export const adminDeleteUser = async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).json({ message: 'No puedes eliminar tu propio usuario admin' });
        }

        const userDeleted = await userModel.findByIdAndDelete(req.params.id).select('-password');

        if (!userDeleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(userDeleted);
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};