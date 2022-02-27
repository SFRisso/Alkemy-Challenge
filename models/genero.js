module.exports = (sequelize, DataTypes) => {
    return sequelize.define('genero', {
        genero_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: DataTypes.STRING,

    })
};