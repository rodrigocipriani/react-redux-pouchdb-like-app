// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
const config = require('../../config/config');

module.exports = (app) => {

    const AvaliacaoService = app.services.avaliacao;
    const sequelize        = app.models.models.sequelize;
    const controller       = {};

    controller.avaliarEmpresa     = (req, res, next) => {


        return AvaliacaoService.inserirAvaliacao()

    };
    controller.consultarAvaliacao = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };
    controller.consultarAvaliacoesAtuaisUsuario = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };
    controller.consultarAvaliacoesEmpresaUsuario = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };

    return controller;

};






