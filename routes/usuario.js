const { Router, response } = require('express');
const { getUsuarios } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/usuarios', [
    validarJWT
], getUsuarios);

module.exports = router;