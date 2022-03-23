const router = require('express').Router();
const { Op } = require("sequelize");
const moment = require("moment");
const { peliSerie, genero, personaje } = require('../../db');
const movieValidation = require('../../middlewares/movie_validation');


//Busqueda y listado
router.get('', async(req, res) => {
    try {
        let peli
        if (req.query.name) {
            peli = await peliSerie.findAll({
                where: {
                    titulo: {
                        [Op.substring]: req.query.name
                    }
                }
            });
        } else if (req.query.genre) {
            peli = await peliSerie.findAll({
                include: {
                    model: genero,
                    where: { genero_id: req.query.genre },
                    required: true
                }
            });
        } else if (req.query.order === 'DESC') {
            peli = await peliSerie.findAll({
                order: [
                    ['fecha_creacion', 'DESC']
                ]
            });
        } else if (req.query.order === 'ASC') {
            peli = await peliSerie.findAll({
                order: [
                    ['fecha_creacion', 'ASC']
                ]
            });
        } else if (req.url == '/') {
            peli = await peliSerie.findAll({ attributes: ['titulo', 'imagen', 'fecha_creacion'] });
        } else {
            return res.status(404).json({ error: 'url no existe' });
        }

        if (Object.keys(peli).length === 0) {
            res.status(400).json({ error: 'no se encontro ninguna pelicula o serie en la base de datos con esos parametros' });
        } else {
            res.status(200).json(peli);
        }
    } catch {
        console.log(err);
        return res.status(500);
    }
});

//Detalles
router.get('/Detalles', async(req, res) => {
    let peli = await peliSerie.findAll({ include: personaje });
    if (Object.keys(peli).length === 0) {
        res.status(400).json({ error: 'no se encontro ninguna pelicula o serie en la base de datos' });
    } else {
        res.status(200).json(peli);
    }
});


//Alta
router.post('', movieValidation.create, async(req, res) => {
    try {
        res.status(201).json(await peliSerie.create(req.body));
    } catch (err) {
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        })
        console.log(errObj);
        res.json(errObj);
    }
});

//Modificacion
router.put('/:id', movieValidation.update, async(req, res) => {
    let peli = await peliSerie.update(req.body, { where: { peli_serie_id: req.params.id } });
    if (peli == 0) {
        res.status(400).json({ error: 'La pelicula o serie que desea modificar no se encuentra en la base de datos o no ingreso ningun dato para modificar' });
    } else {
        res.status(200).json({ success: 'Pelicula o serie modificada.' })
    }
});

//Eliminacion
router.delete('/:id', async(req, res) => {
    let peli = await peliSerie.destroy({ where: { peli_serie_id: req.params.id } })
    if (peli == 0) {
        res.status(400).json({ error: 'La pelicula o serie que desea eliminar no se encuentra en la base de datos, o los datos ingresados son incorrectos(el parametro debe contener la id de una fila existente).' });
    } else if (peli == 1) {
        res.status(200).json({ success: 'Pelicula o serie eliminada.' })
    }
});

module.exports = router;