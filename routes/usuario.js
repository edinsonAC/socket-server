const { Router, response } = require('express');
const { getUsuarios, updateUser } = require('../controllers/usuario');
const { guardarMensaje } = require('../controllers/socket');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/usuarios', [
    validarJWT
], getUsuarios);

router.put('/update/:id', [
    validarJWT
], updateUser);

router.post('/mensaje', [
    validarJWT
], guardarMensaje);


module.exports = router;