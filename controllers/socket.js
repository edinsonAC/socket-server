const Usuario = require('../models/usuario')
const Mensaje = require('../models/mensaje')
const axios = require('axios');

const usuarioConectado = async(uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}
const usuarioDesconectado = async(uid = '') => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const guardarMensaje = async(payload) => {
    try {
        const mensaje = new Mensaje(payload)
        await mensaje.save();

        const usuario = await Usuario.findById(payload.para);
        const usuarioDe = await Usuario.findById(payload.de);

        let body = {
            "to": usuario.token,
            "notification": {
                "title": usuarioDe.nombre,
                "body": payload.mensaje
            },
            "data": {
                "us": usuario,
                "usde": usuarioDe,
                "mensaje": payload.mensaje
            }
        }

        let res = await axios.post('https://fcm.googleapis.com/fcm/send', body, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.TOKEN_KEY
            }
        });
        return true
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    guardarMensaje
}