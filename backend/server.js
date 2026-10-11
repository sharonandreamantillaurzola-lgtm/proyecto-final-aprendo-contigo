import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ServicioModel } from './modelos/Servicio.js';
import { PromocionModel } from './modelos/Promocion.js';
import { ReconocimientoModel } from './modelos/Reconocimiento.js';
import { ContactoModel } from './modelos/Contacto.js';
import router from './routes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());


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