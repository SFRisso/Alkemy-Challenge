const { body } = require('express-validator');
const { executeValidation } = require('./validations_index');
var { isDate } = require('validator');
const { options } = require('../routes/api/characters');

const commonValidation = [
    body('imagen')
    .optional()
    .isString().matches(/^.*\.(jpg|JPG|png|PNG)$/i).withMessage('la imagen debe ser de formato jpg o png').bail()
    .notEmpty().withMessage('la imagen de la pelicula o serie no puede estar vacia').bail()
    .isLength({ max: 255 }).withMessage('la imagen de la pelicula o serie debe tener una longitud maxima de 255 caracteres'),

    body('calif')
    .optional()
    .notEmpty().withMessage('la calificacion no puede estar vacia').bail()
    .isInt({ min: 1, max: 5 }).withMessage('la calificacion debe ser integer y ser entre 1 y 5'),
    executeValidation
];

const create = [
    body('titulo')
    .exists().withMessage('el titulo de la pelicula o serie es obligatorio').bail()
    .notEmpty().withMessage('el titulo de la pelicula o serie no puede estar vacio').bail()
    .isLength({ max: 255 }).withMessage('el titulo de la pelicula o serie debe tener una longitud maxima de 255 caracteres'),

    body('fecha_creacion')
    .exists().withMessage('la fecha de creacion es obligatoria').bail()
    .notEmpty().withMessage('la fecha de creacion no puede estar vacia').bail()
    .isDate({ format: 'DD-MM-YYYY' }).toDate().withMessage('la fecha debe tener un formato de fecha valida (DD-MM-YYYY)'),
    ...commonValidation
];

const update = [
    body('titulo')
    .optional()
    .notEmpty().withMessage('el titulo de la pelicula o serie no puede estar vacio').bail()
    .isLength({ max: 255 }).withMessage('el titulo de la pelicula o serie debe tener una longitud maxima de 255 caracteres'),

    body('fecha_creacion')
    .optional()
    .notEmpty().withMessage('la fecha de creacion no puede estar vacia').bail()
    .isDate({ format: 'DD-MM-YYYY' }).toDate().withMessage('la fecha debe tener un formato de fecha valida (DD-MM-YYYY)'),
    ...commonValidation
];

module.exports = {
    create,
    update,
}