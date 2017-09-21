module.exports = (sequelize, DataTypes) => {


    const avaliacao = sequelize.define('Avaliacao', {

        usuario_id    : {
            type       : DataTypes.INTEGER,
            underscored: true,
            primaryKey : true
        },
        cd_empresa    : {
            type       : DataTypes.DATE,
            primaryKey : true,
            underscored: true
        },
        data_avaliacao: {
            type       : DataTypes.DATE,
            primaryKey : true,
            underscored: true
        },
        aprovada      : {
            type       : DataTypes.BOOLEAN,
            allowNull  : false,
            underscored: true
        },
        comentario    : {
            type       : DataTypes.TEXT,
            allowNull  : true,
            underscored: true
        },

        dt_atualizacao: {
            type        : DataTypes.DATE,
            underscored : true,
            allowNull   : false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'avaliacao',

    });


    return avaliacao;
};


