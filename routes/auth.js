const { Router, response } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auths');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'No es un tipo email').isEmail(),
    validarCampos
], crearUsuario);

router.post('/login', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'No es un tipo email').isEmail(),
    validarCampos
], login);
router.get('/renew', [
    validarJWT
], renew);

module.exports = router;