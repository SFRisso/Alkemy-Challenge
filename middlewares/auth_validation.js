const { body } = require('express-validator');
const { executeValidation } = require('./validations_index');

const email = body('email')
    .exists().withMessage('el email es obligatorio').bail()
    .isEmail().withMessage('el email debe ser correcto').bail()
    .isLength({ max: 255 }).withMessage('el email debe tener una longitud maxima de 255 caracteres').normalizeEmail();

const contraseña = body('contraseña')
    .exists().withMessage('la contraseña es obligatoria').bail()
    .isString().matches(/^\S*$/i).withMessage('la contraseña no debe tener espacios').bail()
    .notEmpty().withMessage('la contraseña no puede estar vacia').bail()
    .isLength({ max: 15 }).withMessage('la contraseña debe tener una longitud maxima de 15 caracteres');

const nombreUsuario = body('nombre_usuario')
    .notEmpty().matches(/^[A-Za-z0-9_]+$/i).withMessage('ingrese el nombre de usuario correctamente (no debe tener espacios ni caracteres especiales)').bail()
    .isLength({ max: 50 }).withMessage('el nombre de usuario debe tener una longitud maxima de 50 caracteres');

const login = [email, contraseña, executeValidation];
const register = [nombreUsuario, email, contraseña, executeValidation];

module.exports = {
    login,
    register
}