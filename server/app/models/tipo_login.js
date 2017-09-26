module.exports = (sequelize, DataTypes) => {


    const tipoLogin = sequelize.define('TipoLogin', {

        cd_tipo_login: {
            type         : DataTypes.INTEGER,
            underscored  : true,
            autoIncrement: true,
            primaryKey   : true
        },
        descricao    : {
            type       : DataTypes.TEXT,
            allowNull  : false,
            underscored: true
        },
        vigente      : {
            type        : DataTypes.BOOLEAN,
            allowNull   : false,
            underscored : true,
            defaultValue: true
        },
        criacao: {
            type        : DataTypes.DATE,
            underscored : true,
            allowNull   : false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'tipo_login',

    });


    return tipoLogin;
};


