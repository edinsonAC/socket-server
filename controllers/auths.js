const { response } = require("express");
const Usuario = require("../models/usuario")
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email: email })
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        const usuario = new Usuario(req.body)
            //encryptar
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        //jwt
        const token = await generarJWT(usuario.uid);
        res.json({
            ok: true,
            msg: 'Crear usuario',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
};

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const usLogin = await Usuario.findOne({ email: email })
        if (!usLogin) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync(password, usLogin.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }
        const token = await generarJWT(usLogin._id);
        return res.json({
            ok: true,
            usuario: usLogin,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

const renew = async(req, res = response) => {
    const uid = req.uid;

    try {

        let token = await generarJWT(uid);
        let usuario = await Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        return res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

module.exports = {
    crearUsuario,
    login,
    renew
}