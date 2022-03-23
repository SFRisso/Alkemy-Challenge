const router = require('express').Router();
const { send } = require('express/lib/response');
const { Op } = require("sequelize");
const { personaje, peliSerie } = require('../../db');
const charcaterValidation = require('../../middlewares/character_validation');

//Busqueda y listado
router.get('', async(req, res) => {
    try {
        let pers
        if (req.query.name) {
            pers = await personaje.findAll({
                where: {
                    nombre: {
                        [Op.substring]: req.query.name
                    }
                }
            });
        } else if (req.query.age) {
            pers = await personaje.findAll({ where: { edad: req.query.age } });
        } else if (req.query.weight) {
            pers = await personaje.findAll({ where: { peso: req.query.weight } });
        } else if (req.query.movies) {
            pers = await personaje.findAll({
                include: {
                    model: peliSerie,
                    where: { peli_serie_id: req.query.movies },
                    required: true
                }
            })
        } else if (req.url == '/') {
            pers = await personaje.findAll({ attributes: ['nombre', 'imagen'] });
        } else {
            return res.status(404).json({ error: 'url no existe' });
        }

        if (Object.keys(pers).length === 0) {
            res.status(400).json({ error: 'no se encontro ninguno personaje con esos parametros' });
        } else {
            res.status(200).json(pers);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});


//Detalles
router.get('/Detalles', async(req, res) => {
    let pers = await personaje.findAll({ include: peliSerie });
    if (Object.keys(pers).length === 0) {
        res.status(400).json({ error: 'no se encontro ningun personaje en la base de datos' });
    } else {
        res.status(200).json(pers);
    }
});

//Alta
router.post('', charcaterValidation.create, async(req, res) => {
    try {
        res.status(201).json(await personaje.create(req.body));
    } catch (err) {
        const errObj = {};
        err.errors.map(er => {
            errObj[er.path] = er.message;
        })
        console.log(errObj);
        res.status(400).json(errObj);
    }
});

//Modificacion
router.put('/:idPer', charcaterValidation.update, async(req, res) => {
    let pers = await personaje.update(req.body, { where: { personaje_id: req.params.idPer } })
    if (pers == 0) {
        res.status(400).json({ error: 'El personaje que desea modificar no se encuentra en la base de datos o no ingreso ningun dato para modificar' });
    } else {
        res.status(200).json({ success: 'Personaje modificado.' })
    }

});

//Eliminacion
router.delete('/:idPer', async(req, res) => {
    let pers = await personaje.destroy({
        where: { personaje_id: req.params.idPer }
    })
    if (pers == 0) {
        res.status(400).json({ error: 'El personaje que desea eliminar no se encuentra en la base de datos, o los datos ingresados son incorrectos(el parametro debe contener la id de una fila existente).' });
    } else {
        res.status(200).json({ success: 'Personaje eliminado.' })
    }
});

module.exports = router;