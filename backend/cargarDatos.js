import mongoose from 'mongoose';
import { PromocionModel } from './modelos/Promocion.js';
import { ReconocimientoModel } from './modelos/Reconocimiento.js';
import { promocionesData } from './datos/promociones.js';
import { reconocimientosData } from './datos/reconocimientos.js';


/*
    conecction db and insert data in schemas
*/
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {

        console.log('MongoDB conectado');

        await PromocionModel.deleteMany({});
        await ReconocimientoModel.deleteMany({});

        await PromocionModel.insertMany(promocionesData);
        await ReconocimientoModel.insertMany(reconocimientosData);

        console.log('Promociones y reconocimientos cargados correctamente');

        await mongoose.connection.close();

        console.log('Conexión cerrada');

    })
    .catch((error) => {
        console.log('Error:', error);
    });