const chai           = require('chai');
const express        = require('../../config/express');
const chaiHttp       = require('chai-http');
const should         = chai.should();
const app            = express();
const EmpresaService = app.services.empresa;

chai.use(chaiHttp);


describe('Empresa', () => {


    before(() => {
        return EmpresaService.excluirTodasEmpresas()

    });


    describe('inclusão ', () => {

        it('1 - incluir somente nome', () => {

            const empresa  = {
               nome : 'Teste'
            };


            return chai.request(app).post('/api/v1/empresa/cadastrar').send(empresa)
                .then(res => {
                    res.should.have.status(200);
                    res.body.vigente.should.equal(true);

                })
        });
        it('2 - incluir nome e cnpj', () => {

            const empresa  = {
               nome : 'Teste',
               cnpj : '00000000000191'
            };


            return chai.request(app).post('/api/v1/empresa/cadastrar').send(empresa)
                .then(res => {
                    res.should.have.status(200);
                    res.body.vigente.should.equal(true);

                })
        });

    });

});
