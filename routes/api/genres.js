const router = require('express').Router();
const { genero } = require('../../db');

router.get('/', async(req, res) => {
    res.json(await genero.findAll());
})

module.exports = router;