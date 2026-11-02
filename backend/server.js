import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import router from './routes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = (process.env.FRONTEND_URLS || '')
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

const localOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || origin === 'null' || allowedOrigins.includes(origin) || localOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('Origen no permitido por CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
}));



const mongoUri = process.env.MONGO_URI?.trim().replace(/^["']|["']$/g, '');

mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB conectado'))
    .catch(error => console.error('Error al conectar con MongoDB:', error));


// Permite recibir información en formato JSON
app.use(express.json());



app.use('/api', router);

// Servir el build de producción del frontend (React)
const DIST_DIR = path.join(__dirname, '../frontend/dist');
app.use(express.static(DIST_DIR));

// Fallback SPA: las rutas del cliente (p. ej. /admin) sirven index.html.
// No se tocan las rutas /api que no hayan coincidido: siguen a su 404.
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.join(DIST_DIR, 'index.html'));
    }
    next();
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});