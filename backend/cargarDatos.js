const mongoose = require('mongoose');

const Promocion = require('./modelos/Promocion');
const Reconocimiento = require('./modelos/Reconocimiento');

const promociones = require('./datos/promociones');
const reconocimientos = require('./datos/reconocimientos');

mongoose.connect('mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/aprendocontigo')
    .then(async () => {

        console.log('MongoDB conectado');

        await Promocion.deleteMany({});
        await Reconocimiento.deleteMany({});

        await Promocion.insertMany(promociones);
        await Reconocimiento.insertMany(reconocimientos);

        console.log('Promociones y reconocimientos cargados correctamente');

        await mongoose.connection.close();

        console.log('Conexión cerrada');

    })
    .catch((error) => {
        console.log('Error:', error);
    });