module.exports = (app) => {

    const EmpresaModel = app.models.models.Empresa;

    const service = {};


    service.inserirEmpresa       = (nome, cnpj) => {

        return EmpresaModel.create({
            nome,
            cnpj
        })

    };
    service.recuperarEmpresa     = (empresaId) => {

        return EmpresaModel.findById(empresaId,
            {

                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.recuperarEmpresas    = () => {

        return EmpresaModel.findAll(
            {
                where     : {
                    'vigente': true,
                },
                attributes: {exclude: ['dt_atualizacao']}
            }
        );

    };
    service.excluirTodasEmpresas = () => {

        return EmpresaModel.destroy({
            where: {}
        });

    };


    return service;

};

