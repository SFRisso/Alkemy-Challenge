module.exports = (sequelize, DataTypes) => {
    return sequelize.define('peli_serie', {
        peli_serie_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        imagen: DataTypes.STRING,
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        calif: DataTypes.INTEGER
    }, {
        tableName: 'pelis_series',
    })
};