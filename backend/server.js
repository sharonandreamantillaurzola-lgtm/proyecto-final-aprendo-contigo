const express = require('express');
const mongoose = require('mongoose');

const Servicio = require('./modelos/Servicio');
const Promocion = require('./modelos/Promocion');
const Reconocimiento = require('./modelos/Reconocimiento');
const Contacto = require('./modelos/Contacto');

const app = express();


// ==================================================
// CONEXIÓN CON MONGODB
// ==================================================

mongoose.connect('mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/aprendocontigo')
    .then(() => {
        console.log('MongoDB conectado');
    })
    .catch((error) => {
        console.log('Error al conectar con MongoDB:', error);
    });


// Permite recibir información en formato JSON
app.use(express.json());


// ==================================================
// INICIO
// ==================================================

app.get('/', (req, res) => {
    res.send('Hola desde mi backend de Aprendo Contigo');
});


// ==================================================
// SERVICIOS
// ==================================================

// GET: obtener todos los servicios
app.get('/productos', async (req, res) => {
    try {
        const servicios = await Servicio.find();

        res.json(servicios);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los servicios',
            error: error.message
        });

    }
});


// POST: crear un servicio
app.post('/productos', async (req, res) => {
    try {

        const nuevoServicio = new Servicio(req.body);

        const servicioGuardado = await nuevoServicio.save();

        res.status(201).json(servicioGuardado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar el servicio',
            error: error.message
        });

    }
});


// PUT: modificar un servicio
app.put('/productos/:id', async (req, res) => {
    try {

        const servicioActualizado =
            await Servicio.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

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

        const servicioEliminado =
            await Servicio.findByIdAndDelete(
                req.params.id
            );

        res.json(servicioEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el servicio',
            error: error.message
        });

    }
});


// ==================================================
// PROMOCIONES
// ==================================================

// GET: obtener promociones
app.get('/promociones', async (req, res) => {
    try {

        const promociones = await Promocion.find();

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

        const nuevaPromocion = new Promocion(req.body);

        const promocionGuardada =
            await nuevaPromocion.save();

        res.status(201).json(promocionGuardada);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar la promoción',
            error: error.message
        });

    }
});


// PUT: modificar promoción
app.put('/promociones/:id', async (req, res) => {
    try {

        const promocionActualizada =
            await Promocion.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(promocionActualizada);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar la promoción',
            error: error.message
        });

    }
});


// DELETE: eliminar promoción
app.delete('/promociones/:id', async (req, res) => {
    try {

        const promocionEliminada =
            await Promocion.findByIdAndDelete(
                req.params.id
            );

        res.json(promocionEliminada);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar la promoción',
            error: error.message
        });

    }
});


// ==================================================
// RECONOCIMIENTOS
// ==================================================

// GET: obtener reconocimientos
app.get('/reconocimientos', async (req, res) => {
    try {

        const reconocimientos =
            await Reconocimiento.find();

        res.json(reconocimientos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los reconocimientos',
            error: error.message
        });

    }
});


// POST: crear reconocimiento
app.post('/reconocimientos', async (req, res) => {
    try {

        const nuevoReconocimiento =
            new Reconocimiento(req.body);

        const reconocimientoGuardado =
            await nuevoReconocimiento.save();

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

        const reconocimientoActualizado =
            await Reconocimiento.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

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

        const reconocimientoEliminado =
            await Reconocimiento.findByIdAndDelete(
                req.params.id
            );

        res.json(reconocimientoEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el reconocimiento',
            error: error.message
        });

    }
});


// ==================================================
// CONTACTOS
// ==================================================

// POST: guardar un contacto
app.post('/contactos', async (req, res) => {
    try {

        const nuevoContacto =
            new Contacto(req.body);

        const contactoGuardado =
            await nuevoContacto.save();

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

        const contactos =
            await Contacto.find()
                .sort({ fecha: -1 });

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

        const contactoActualizado =
            await Contacto.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(contactoActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el contacto',
            error: error.message
        });

    }
});


// ==================================================
// SERVIDOR
// ==================================================

app.listen(3000, () => {
    console.log(
        'Servidor funcionando en http://localhost:3000'
    );
});