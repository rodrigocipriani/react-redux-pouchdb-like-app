module.exports = (sequelize, DataTypes) => {


    const usuario = sequelize.define('Usuario', {

        usuario_id: {
            type         : DataTypes.INTEGER,
            underscored  : true,
            autoIncrement: true,
            primaryKey   : true
        },
        nome      : {
            type       : DataTypes.TEXT,
            allowNull  : false,
            underscored: true
        },
        cd_tipo_usuario      : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            underscored: true
        },
        situacao  : {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            underscored: true
        },
        cd_tipo_login: {
            type       : DataTypes.INTEGER,
            allowNull  : false,
            underscored: true
        },

        criacao: {
            type        : DataTypes.DATE,
            underscored : true,
            allowNull   : false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'usuario',

    });


    return usuario;
};


