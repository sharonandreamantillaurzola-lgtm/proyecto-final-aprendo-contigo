const mongoose = require('mongoose');
const Servicio = require('./modelos/Servicio');
const servicios = require('./datos/servicios');

mongoose.connect('mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/aprendocontigo')
    .then(async () => {
        console.log('MongoDB conectado');

        await Servicio.deleteMany({});

        await Servicio.insertMany(servicios);

        console.log('Los 8 servicios fueron cargados correctamente');

        await mongoose.connection.close();
        console.log('Conexión cerrada');
    })
    .catch((error) => {
        console.log('Error:', error);
    });
