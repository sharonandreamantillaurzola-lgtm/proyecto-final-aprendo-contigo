import { ContactoModel } from "../modelos/Contacto.js";

// POST: registrar una solicitud de contacto desde la página
export const createContacto = async (req, res) => {
    try {
        const nuevoContacto = new ContactoModel(req.body);

        const contactoGuardado = await nuevoContacto.save();

        res.status(201).json(contactoGuardado);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al guardar el contacto',
            error: error.message
        });
    }
}
