module.exports = (sequalize, DataTypes) => {
    return sequalize.define('usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}