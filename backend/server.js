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

// Mostrar la página principal del frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});