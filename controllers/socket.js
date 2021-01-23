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
                "body": payload.mensaje,
                "image": 'https://scontent.fbga2-1.fna.fbcdn.net/v/t1.0-9/83173438_2668462746524103_230961711723577344_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=yJJ45ct34O8AX-rQ4lu&_nc_ht=scontent.fbga2-1.fna&oh=e4f25252dc7f93bf6ed8f87d332f0283&oe=60341420'
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