const { Sequelize } = require('sequelize');
const generoModel = require('./models/genero.js');
const pesonajeModel = require('./models/personaje.js');
const peliSerieModel = require('./models/peli_serie.js');
const usuariopModel = require('./models/usuario.js');

const sequelize = new Sequelize('alkemy_challenge', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('La base de datos se conecto correctamente.');
    }).catch((err) => {
        console.error('Se encontro un error al intentar conectar a la base de datos', err);
    });

const genero = generoModel(sequelize, Sequelize);
const personaje = pesonajeModel(sequelize, Sequelize);
const peliSerie = peliSerieModel(sequelize, Sequelize);
const usuario = usuariopModel(sequelize, Sequelize);

genero.belongsToMany(peliSerie, { through: 'peli_serie_genero', foreignKey: 'genero_id', timestamps: false });
peliSerie.belongsToMany(genero, { through: 'peli_serie_genero', foreignKey: 'peli_serie_id', timestamps: false });
personaje.belongsToMany(peliSerie, { through: 'peli_series_personajes', foreignKey: 'personaje_id', timestamps: false });
peliSerie.belongsToMany(personaje, { through: 'peli_series_personajes', foreignKey: 'peli_serie_id', timestamps: false });

sequelize.sync({ force: false, logging: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    }).catch((err) => {
        console.log("Error al sincronizar las tablas", err);
    });

module.exports = {
    genero,
    personaje,
    peliSerie,
    usuario
}