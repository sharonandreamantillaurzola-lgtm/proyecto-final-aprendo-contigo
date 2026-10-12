import { ReconocimientoModel } from "../modelos/Reconocimiento.js";

// GET: obtener reconocimientos
export const getRecognitions = async (req, res) => {
    try {

        const reconocimientos = await ReconocimientoModel.find();
        res.json(reconocimientos);

    } 
    catch (error) {

        res.status(500).json({
            mensaje: 'Error al obtener los reconocimientos',
            error: error.message
        });

    }
}


// POST: crear reconocimiento
export const createRecognition =  async (req, res) => {
    try {

        const nuevoReconocimiento = new ReconocimientoModel(req.body);

        const reconocimientoGuardado = await nuevoReconocimiento.save();

        res.status(201).json(reconocimientoGuardado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al guardar el reconocimiento',
            error: error.message
        });

    }
}

// PUT: modificar reconocimiento
export const updateRecognition = async (req, res) => {
    try {

        const reconocimientoActualizado = await ReconocimientoModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });

        res.json(reconocimientoActualizado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al actualizar el reconocimiento',
            error: error.message
        });

    }
}


// DELETE: eliminar reconocimiento
export const deleteRecognition =  async (req, res) => {
    try {

        const reconocimientoEliminado = await ReconocimientoModel.findByIdAndDelete(req.params.id);

        res.json(reconocimientoEliminado);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al eliminar el reconocimiento',
            error: error.message
        });

    }
}
