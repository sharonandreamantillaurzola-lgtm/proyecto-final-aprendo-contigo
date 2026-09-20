const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    correo: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: false
    },

    edad: {
        type: Number,
        required: false
    },

    servicioInteresado: {
        type: String,
        required: false
    },

    mensaje: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        enum: ['Pendiente', 'Contactado', 'Atendido'],
        default: 'Pendiente'
    },

    fecha: {
        type: Date,
        default: Date.now
    }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;