const { body } = require('express-validator');
const { executeValidation } = require('./validations_index');

const commonValidation = [
    body('imagen')
    .optional()
    .isString().matches(/^.*\.(jpg|JPG|png|PNG)$/i).withMessage('la imagen debe ser de formato jpg o png').bail()
    .notEmpty().withMessage('la imagen del personaje no puede estar vacia').bail()
    .isLength({ max: 255 }).withMessage('la imagen del personaje debe tener una longitud maxima de 255 caracteres'),

    body('edad')
    .optional()
    .notEmpty().withMessage('la edad del personaje no puede estar vacio').bail()
    .isInt({ min: 0 }).withMessage('la edad debe ser integer y mayor a 0'),

    body('peso')
    .optional()
    .notEmpty().withMessage('el peso del personaje no puede estar vacio').bail()
    .isInt({ min: 0 }).withMessage('el peso debe ser integer y mayor a 0'),
    executeValidation
];

const create = [
    body('nombre')
    .exists().withMessage('el nombre del personaje es obligatorio').bail()
    .notEmpty().withMessage('el nombre del personaje no puede estar vacio').bail()
    .isLength({ max: 255 }).withMessage('el nombre del personaje debe tener una longitud maxima de 255 caracteres'),

    body('historia')
    .exists().withMessage('la historia del personaje es obligatorio').bail()
    .notEmpty().withMessage('la historia del personaje no puede estar vacio'),
    ...commonValidation
];

const update = [
    body('nombre')
    .optional()
    .notEmpty().withMessage('el nombre del personaje no puede estar vacio').bail()
    .isLength({ max: 255 }).withMessage('el nombre del personaje debe tener una longitud maxima de 255 caracteres'),

    body('historia')
    .optional()
    .notEmpty().withMessage('la historia del personaje no puede estar vacio'),
    ...commonValidation
];


module.exports = {
    create,
    update,
}