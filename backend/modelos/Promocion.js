import mongoose from "mongoose";

const promocionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: false
    },

    precioAnterior: {
        type: Number,
        required: false
    },

    fechaInicio: {
        type: Date,
        required: false
    },

    fechaFin: {
        type: Date,
        required: false
    },

    activa: {
        type: Boolean,
        default: true
    }
});

export const PromocionModel = mongoose.model('promocions', promocionSchema);

