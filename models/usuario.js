module.exports = (sequalize, DataTypes) => {
    return sequalize.define('usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    });
}