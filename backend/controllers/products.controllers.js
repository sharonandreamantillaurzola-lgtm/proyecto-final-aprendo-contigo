import { ServicioModel } from "../modelos/Servicio.js";

// GET: obtener todos los servicios
export const getProducts =  async (req, res) => {
    try {
        const servicios = await ServicioModel.find();
        console.log("Servicios encontrados:", servicios.map(s => s.nombre));

        res.json(servicios);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los servicios',
            error: error.message
        });

    }
}


// POST: crear un servicio
export const createProduct = async (req, res) => {
    try {

        const nuevoServicio = new ServicioModel(req.body);

        const servicioGuardado = await nuevoServicio.save();

        res.status(201).json(servicioGuardado);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            mensaje: 'Error al guardar el servicio',
            error: error.message
        });

    }
}


// PUT: modificar un servicio
export const updateProduct =  async (req, res) => {
    try {

        const servicioActualizado = await ServicioModel.findByIdAndUpdate( req.params.id, req.body, { new: true });

        res.json(servicioActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el servicio',
            error: error.message
        });

    }
}


// DELETE: eliminar un servicio
export const deleteProduct =  async (req, res) => {
    try {

        const servicioEliminado = await ServicioModel.findByIdAndDelete(req.params.id);

        res.json(servicioEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el servicio',
            error: error.message
        });

    }
}
