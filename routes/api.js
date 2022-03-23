const router = require('express').Router();
const apiGenerosRouter = require('./api/genres');
const apiPeliSeriesRouter = require('./api/movies');
const apiPersonajesRouter = require('./api/characters');
const apiUserRouter = require('./api/auth');
const middleware = require('../middlewares/user_token');

//rutas 
router.use('/movies', middleware.checkToken, apiPeliSeriesRouter);
router.use('/characters', middleware.checkToken, apiPersonajesRouter);
router.use('/genres', middleware.checkToken, apiGenerosRouter);
router.use('/auth', apiUserRouter);

module.exports = router;