module.exports = (sequelize, DataTypes) => {


  const empresa = sequelize.define('Empresa', {

      cd_empresa                 : {
      type         : DataTypes.INTEGER,
      underscored  : true,
      autoIncrement: true,
      primaryKey   : true
    },
      vigente                 : {
      type       : DataTypes.BOOLEAN,
      allowNull  : false,
      defaultValue : true,
      underscored: true
    },
      nome                 : {
      type       : DataTypes.TEXT,
      allowNull  : true,
      underscored: true
    },
      cnpj      : {
      type       : DataTypes.CHAR(15),
      allowNull  : true,
      underscored: true
    },

      dt_atualizacao                     : {
      type        : DataTypes.DATE,
      underscored : true,
      allowNull   : false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'empresa',

  });



  return empresa;
};


