module.exports = (app) => {

    const AvaliacaoModel = app.models.models.Avaliacao;

    const service = {};


    service.inserirAvaliacao                  = (usuarioId, empresaId, dataAvaliacao, texto, aprovacao) => {

        return AvaliacaoModel.create(
            {
                where: {
                    'usuario_id'    : usuarioId,
                    'cd_empresa'    : empresaId,
                    'data_avaliacao': dataAvaliacao,
                    'aprovada'      : aprovacao,
                    'comentario'    : texto,
                },

            }
        );

    };
    service.recuperarAvaliacao                = (usuarioId, empresaId, dataAvaliacao) => {

        return AvaliacaoModel.find(
            {
                where     : {
                    'usuario_id'    : usuarioId,
                    'cd_empresa'    : empresaId,
                    'data_avaliacao': dataAvaliacao
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.recuperarAvaliacoesUsuario        = (usuarioId) => {

        return AvaliacaoModel.findAll(
            {
                where     : {
                    'usuario_id': usuarioId,
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.recuperarAvaliacoesUsuarioEmpresa = (usuarioId, empresaId) => {

        return AvaliacaoModel.findAll(
            {
                where     : {
                    'usuario_id': usuarioId,
                    'cd_empresa': empresaId,
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.recuperarAvaliacoesAtuaisUsuario  = (usuarioId) => {

        return AvaliacaoModel.findAll(
            {
                where     : {
                    'usuario_id': usuarioId,
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };


    return service;

};

