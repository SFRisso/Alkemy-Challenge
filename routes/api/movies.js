const router = require('express').Router();
const { Op } = require("sequelize");
const moment = require("moment");
const { peliSerie, genero, personaje } = require('../../db');

//Busqueda y listado
router.get('', async(req, res) => {
    var peli
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
    } else {
        peli = await peliSerie.findAll({ attributes: ['titulo', 'imagen', 'fecha_creacion'] });
    }
    res.json(peli);
});

//Detalles
router.get('/Detalles', async(req, res) => {
    res.json(await peliSerie.findAll({ include: personaje }));
});


//Alta
router.post('', async(req, res) => {
    res.json(await peliSerie.create(req.body));
});

//Modificacion
router.put('/:id', async(req, res) => {
    await peliSerie.update(req.body, {
        where: { peli_serie_id: req.params.id }
    });
    res.json({ success: 'Se ha modificado exitosamente' })
});

//Eliminacion
router.delete('/:id', async(req, res) => {
    await peliSerie.destroy({
        where: { peli_serie_id: req.params.id }
    });
    res.json({ success: 'Se ha eliminado correctamente.' })
});

module.exports = router;