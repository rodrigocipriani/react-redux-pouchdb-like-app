// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
const config  = require('../../config/config');
const BrError = require('../helpers/error_constructor');

module.exports = (app) => {

    const AvaliacaoService = app.services.avaliacao;
    const sequelize        = app.models.models.sequelize;
    const controller       = {};

    controller.avaliarEmpresa                    = (req, res, next) => {

        console.log("req", req.body);
        const {empresaId, aprovada, comentario} = req.body;

        const usuarioId = req.body.usuarioId;

        if (!empresaId) return next(new BrError('Empresa deve ser informada'));
        if (aprovada === null || aprovada === undefined) return next(new BrError('Aprovação deve ser informada'));

        const dataAtual = new Date();
        return AvaliacaoService.inserirAvaliacao(usuarioId, empresaId, dataAtual, comentario, aprovada)
            .then(avaliacao => {
                res.status(200).send(avaliacao);
            }).catch(err => {
                console.log("aqui", err);

                return next(new BrError(err));
            });


    };
    controller.consultarAvaliacao                = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };
    controller.consultarAvaliacoesAtuaisUsuario  = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };
    controller.consultarAvaliacoesEmpresaUsuario = (req, res, next) => {


        return AvaliacaoService.recuperarAvaliacao()

    };

    return controller;

};






