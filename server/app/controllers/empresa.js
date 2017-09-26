// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
const config = require('../../config/config');

const BrError        = require('../helpers/error_constructor');

module.exports = (app) => {

    const EmpresaService = app.services.empresa;

    const sequelize      = app.models.models.sequelize;
    const controller     = {};

    controller.cadastrarEmpresa  = (req, res, next) => {

        const nome = req.body.nome;
        const cnpj = req.body.cnpj;

        if (!nome)   return next(new BrError('Nome deve ser informado'));

        console.log("entrou", nome, cnpj);
        return EmpresaService.inserirEmpresa(nome, cnpj)
            .then(empresa => {
                res.status(200).send(empresa);
            }).catch(err => {
                return next(new BrError(err));
            });

    };
    controller.consultarEmpresas = (req, res, next) => {


        return EmpresaService.recuperarEmpresas();

    };

    return controller;

};






