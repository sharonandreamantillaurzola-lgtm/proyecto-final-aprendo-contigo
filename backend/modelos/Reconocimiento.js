const mongoose = require('mongoose');

const reconocimientoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    clasesRequeridas: {
        type: Number,
        required: false
    },

    beneficio: {
        type: String,
        required: true
    },

    precioPresencial: {
        type: Number,
        required: false
    },

    precioVirtual: {
        type: Number,
        required: false
    },

    condiciones: {
        type: String,
        required: false
    },

    activo: {
        type: Boolean,
        default: true
    }
});

const Reconocimiento = mongoose.model(
    'Reconocimiento',
    reconocimientoSchema
);

module.exports = Reconocimiento;