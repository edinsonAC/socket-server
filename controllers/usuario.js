const { response } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async(req, res = response) => {
    const uid = req.uid;
    const desde = Number(req.query.desde) || 0;
    try {
        let usuarios = await Usuario.find({ _id: { $ne: uid } }).sort('-online').skip(desde).limit(20)
        if (!usuarios) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        return res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }



}

module.exports = {
    getUsuarios
}