// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
const config = require('../../config/config');

module.exports = (app) => {

    const EmpresaService = app.services.empresa;

    const sequelize  = app.models.models.sequelize;
    const controller = {};

    controller.cadastrarEmpresa  = (req, res, next) => {


        return EmpresaService.inserirEmpresa()

    };
    controller.consultarEmpresas = (req, res, next) => {


        return EmpresaService.recuperarEmpresas();

    };

    return controller;

};






