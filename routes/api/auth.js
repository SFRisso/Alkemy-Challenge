const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { usuario } = require('../../db');
const { sendGridEmail } = require('../../middlewares/sendgrid');
const authValidation = require('../../middlewares/auth_validation');
const jwt = require('jsonwebtoken');

router.post('/register', authValidation.register, async(req, res) => {

    //creacion usuario
    try {
        req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
        const user = await usuario.create(req.body);
        res.status(201).json(user);

    } catch (err) {
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        })
        console.log(errObj);
        res.status(400).json(errObj);
    }
    sendGridEmail(req.body.email);
});

router.post('/login', authValidation.login, async(req, res) => {
    const user = await usuario.findOne({
        where: { email: req.body.email }
    });
    if (user) {
        const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (iguales) {
            res.status(200).json({
                success: 'login realizado exitosamente',
                token: createToken(user),
                expiracion: '30 dias'
            });
        } else {
            res.status(400).json({ error: 'contraseña erronea' });
        }
    } else {
        res.status(400).json({ error: 'el email no existe' });
    }
});

const createToken = (user) => {
    const token = jwt.sign({
            usuarioId: user.usuario_id
        },
        'secret', {
            expiresIn: '30d'
        });
    return token;
}
module.exports = router;