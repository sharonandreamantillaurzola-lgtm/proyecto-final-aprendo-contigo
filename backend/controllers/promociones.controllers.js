import { PromocionModel } from "../modelos/Promocion.js";



// GET: obtener promociones
export const getPromotions = async (req, res) => {
    try {

        const promociones = await PromocionModel.find();

        res.json(promociones);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener las promociones',
            error: error.message
        });

    }
}


// POST: crear promoción
export const createPromotion = async (req, res) => {
    try {

        const nuevaPromocion = new PromocionModel(req.body);

        const promocionGuardada = await nuevaPromocion.save();

        res.status(201).json(promocionGuardada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar la promoción',
            error: error.message
        });

    }
}


// PUT: modificar promoción
export const updatePromotion =  async (req, res) => {
    try {

        const promocionActualizada = await PromocionModel.findByIdAndUpdate(req.params.id,req.body, { new: true });
        res.json(promocionActualizada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar la promoción',
            error: error.message
        });

    }
}


// DELETE: eliminar promoción
export const deletePromotion = async (req, res) => {
    try {

        const promocionEliminada =  await PromocionModel.findByIdAndDelete(req.params.id);
        res.json(promocionEliminada);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar la promoción',
            error: error.message
        });

    }
};