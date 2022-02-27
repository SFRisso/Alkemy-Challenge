const router = require('express').Router();
const { Op } = require("sequelize");
const { personaje, peliSerie } = require('../../db');

//Busqueda y listado
router.get('', async(req, res) => {
    var pers
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
        });
    } else {
        pers = await personaje.findAll({ attributes: ['nombre', 'imagen'] });
    }
    res.json(pers);
});

//Detalles
router.get('/Detalles', async(req, res) => {
    res.json(await personaje.findAll({ include: peliSerie }));
});

//Alta
router.post('', async(req, res) => {
    res.json(await personaje.create(req.body));
});

//Modificacion
router.put('/:idPer', async(req, res) => {
    await personaje.update(req.body, {
        where: { personaje_id: req.params.idPer }
    });
    res.json({ success: 'Personaje modificado.' })
});

//Eliminacion
router.delete('/:idPer', async(req, res) => {
    await personaje.destroy({
        where: { personaje_id: req.params.idPer }
    });
    res.json({ success: 'Personaje eliminado.' })
});

module.exports = router;