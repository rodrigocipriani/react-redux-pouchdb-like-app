

module.exports = (app) => {

    const EmpresaModel = app.models.models.Empresa;

    const service = {};


    service.recuperarEmpresa                = (empresaId) => {

        return EmpresaModel.findById(empresaId,
            {

                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.recuperarEmpresas        = () => {

        return EmpresaModel.findAll(
            {
                where     : {
                    'vigente'    : true,
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };


    return service;

};

