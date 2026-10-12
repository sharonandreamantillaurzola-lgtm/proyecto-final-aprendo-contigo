import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


export const userModel = mongoose.model('user', userSchema);