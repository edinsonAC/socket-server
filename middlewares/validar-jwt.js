const { response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    let token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error token'
        })
    }


}

module.exports = {
    validarJWT
}