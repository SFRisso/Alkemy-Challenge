module.exports = (sequelize, DataTypes) => {
    return sequelize.define('personaje', {
        personaje_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        imagen: DataTypes.STRING,
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        edad: DataTypes.INTEGER,
        peso: DataTypes.INTEGER,
        historia: DataTypes.STRING
    })
};