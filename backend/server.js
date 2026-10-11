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



// Mostrar la página principal del frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});


// GET: obtener todos los servicios
app.get('/productos', async (req, res) => {
    try {
        const servicios = await ServicioModel.find();
        console.log("Servicios encontrados:", servicios.map(s => s.nombre));

        res.json(servicios);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los servicios',
            error: error.message
        });

    }
});


// POST: crear un servicio
app.post('/productos', async (req, res) => {
    try {

        const nuevoServicio = new ServicioModel(req.body);

        const servicioGuardado = await nuevoServicio.save();

        res.status(201).json(servicioGuardado);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: 'Error al guardar el servicio',
            error: error.message
        });

    }
});


// PUT: modificar un servicio
app.put('/productos/:id', async (req, res) => {
    try {

        const servicioActualizado = await ServicioModel.findByIdAndUpdate( req.params.id, req.body, { new: true });

        res.json(servicioActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el servicio',
            error: error.message
        });

    }
});


// DELETE: eliminar un servicio
app.delete('/productos/:id', async (req, res) => {
    try {

        const servicioEliminado = await ServicioModel.findByIdAndDelete(req.params.id);

        res.json(servicioEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el servicio',
            error: error.message
        });

    }
});


// GET: obtener promociones
app.get('/promociones', async (req, res) => {
    try {

        const promociones = await PromocionModel.find();

        res.json(promociones);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener las promociones',
            error: error.message
        });

    }
});


// POST: crear promoción
app.post('/promociones', async (req, res) => {
    try {

        const nuevaPromocion = new PromocionModel(req.body);

        const promocionGuardada = await nuevaPromocion.save();

        res.status(201).json(promocionGuardada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar la promoción',
            error: error.message
        });

    }
});


// PUT: modificar promoción
app.put('/promociones/:id', async (req, res) => {
    try {

        const promocionActualizada = await PromocionModel.findByIdAndUpdate(req.params.id,req.body, { new: true });
        res.json(promocionActualizada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar la promoción',
            error: error.message
        });

    }
});


// DELETE: eliminar promoción
app.delete('/promociones/:id', async (req, res) => {
    try {

        const promocionEliminada =  await PromocionModel.findByIdAndDelete(req.params.id);
        res.json(promocionEliminada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar la promoción',
            error: error.message
        });

    }
});


// GET: obtener reconocimientos
app.get('/reconocimientos', async (req, res) => {
    try {

        const reconocimientos = await ReconocimientoModel.find();
        res.json(reconocimientos);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los reconocimientos',
            error: error.message
        });

    }
});


// POST: crear reconocimiento
app.post('/reconocimientos', async (req, res) => {
    try {

        const nuevoReconocimiento = new ReconocimientoModel(req.body);

        const reconocimientoGuardado = await nuevoReconocimiento.save();

        res.status(201).json(reconocimientoGuardado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar el reconocimiento',
            error: error.message
        });

    }
});


// PUT: modificar reconocimiento
app.put('/reconocimientos/:id', async (req, res) => {
    try {

        const reconocimientoActualizado = await ReconocimientoModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });

        res.json(reconocimientoActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el reconocimiento',
            error: error.message
        });

    }
});


// DELETE: eliminar reconocimiento
app.delete('/reconocimientos/:id', async (req, res) => {
    try {

        const reconocimientoEliminado = await ReconocimientoModel.findByIdAndDelete(req.params.id);

        res.json(reconocimientoEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el reconocimiento',
            error: error.message
        });

    }
});



// POST: guardar un contacto
app.post('/contactos', async (req, res) => {
    try {

        const nuevoContacto = new ContactoModel(req.body);

        const contactoGuardado = await nuevoContacto.save();

        res.status(201).json(contactoGuardado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar el contacto',
            error: error.message
        });

    }
});


// GET: obtener contactos
app.get('/contactos', async (req, res) => {
    try {

        const contactos = await ContactoModel.find().sort({ fecha: -1 });

        res.json(contactos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los contactos',
            error: error.message
        });

    }
});


// PUT: modificar estado del contacto
app.put('/contactos/:id', async (req, res) => {
    try {

        const contactoActualizado = await ContactoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(contactoActualizado);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el contacto',
            error: error.message
        });

    }
});


const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});