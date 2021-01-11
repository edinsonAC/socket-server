const { Router, response } = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mensajes/:de', [
    validarJWT
], obtenerChat);

module.exports = router;