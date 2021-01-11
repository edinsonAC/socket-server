const { response } = require("express");
const Mensaje = require('../models/mensaje')

const obtenerChat = async(req, res = response) => {
    const miUid = req.uid
    const mensajesDe = req.params.de;

    try {
        const last30 = await Mensaje.find({
                $or: [{ de: miUid, para: mensajesDe }, { de: mensajesDe, para: miUid }]
            })
            .sort({ createdAt: 'desc' })
            .limit(30);


        if (last30) {
            return res.json({ ok: true, mensajes: last30 })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

module.exports = {
    obtenerChat
}