const { Router, response } = require('express');
const { getUsuarios, updateUser } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/usuarios', [
    validarJWT
], getUsuarios);

router.put('/update/:id', [
    validarJWT
], updateUser);



module.exports = router;