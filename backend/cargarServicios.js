import 'dotenv/config';
import mongoose from 'mongoose';
import { ServicioModel } from './modelos/Servicio.js';
import { serviciosData } from './datos/servicios.js';
import { promocionesData } from './datos/promociones.js';
import { PromocionModel } from './modelos/Promocion.js';
import { ReconocimientoModel } from './modelos/Reconocimiento.js';
import { reconocimientosData } from './datos/reconocimientos.js';

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB conectado');

        await ServicioModel.deleteMany({});

        await ServicioModel.insertMany(serviciosData);
        await PromocionModel.insertMany(promocionesData);
        await ReconocimientoModel.insertMany(reconocimientosData);

        console.log('Los 8 servicios fueron cargados correctamente');

        await mongoose.connection.close();
        console.log('Conexión cerrada');
    })
    .catch((error) => {
        console.log('Error:', error);
    });
