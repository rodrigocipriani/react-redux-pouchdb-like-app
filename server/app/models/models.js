const path        = require('path');
const fs          = require('fs');
const cls         = require('cls-hooked');
const Sequelize   = require('sequelize');
const Promise     = require('bluebird');
const clsBluebird = require('cls-bluebird');
// const BBModels    = require('bb-models')();
const config      = require('../../config/config');

const namespace = cls.createNamespace('cls-pg-bwl');
clsBluebird(namespace, Promise);
Sequelize.useCLS(namespace);
let sequelize = null;
let modelo    = null;

module.exports = () => {


  if (!modelo) {
    console.log('Inicializa modelos do pg'); // eslint-disable no-console
    if (!sequelize) {
      console.log('-> instancia sequelize com cls'); // eslint-disable no-console
      sequelize = new Sequelize(config.postgres.db, config.postgres.usuario, config.postgres.senha,
        config.postgres.config);
    }
    const db = {};

    fs.readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== 'models.js') && (file !== 'auto');
      })
      .forEach(file => {
        const model    = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
      });


    Object.keys(db).forEach((model) => {
      if ('associate' in db[model]) {
        db[model].associate(db);
      }
    });

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    modelo = db;
  }
  return modelo;
};


