const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { usuario } = require('../../db');
const { check, validationResult } = require('express-validator');

router.post('/register', [
    check('nombre_usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('contraseña', 'La constraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio y debe ser correcto').isEmail()
], async(req, res) => {

    //errores de validacion
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    };

    //creacion usuario
    try {
        req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
        const user = await usuario.create(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
});

router.post('/login', async(req, res) => {
    const user = await usuario.findOne({ where: { email: req.body.email } });
    if (user) {
        const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (iguales) {
            res.json({
                success: 'login realizado exitosamente',
                token: createToken(user)
            });
        } else {
            res.json({ error: 'Error en usuario y/o contraseña' });
        }
    } else {
        res.json({ error: 'Error en usuario y/o contraseña' });
    }
});

const createToken = (user) => {
    const payload = {
        usuarioId: user.usuario_id,
        createdAt: moment().unix(),
        expiredAt: moment().add(2, 'days').unix()
    }
    return jwt.encode(payload, 'secret');
}
module.exports = router;