module.exports = (sequelize, DataTypes) => {


    const usuarioSenha = sequelize.define('UsuarioSenha', {

        usuario_id: {
            type         : DataTypes.INTEGER,
            underscored  : true,
            primaryKey   : true
        },
        senha      : {
            type       : DataTypes.TEXT,
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
        tableName: 'usuario_senha',

    });


    return usuarioSenha;
};


