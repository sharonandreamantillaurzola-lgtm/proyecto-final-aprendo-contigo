const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: false
    },

    precioNormal: {
        type: Number,
        required: false
    },

    descripcion: {
        type: String,
        required: true
    },

    cantidadClases: {
        type: Number,
        required: false
    },

    clasesVirtuales: {
        type: Number,
        required: false
    },

    clasesPresenciales: {
        type: Number,
        required: false
    },

    beneficios: {
        type: [String],
        required: false
    }
});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;