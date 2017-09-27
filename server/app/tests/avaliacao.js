const chai           = require('chai');
const express        = require('../../config/express');
const chaiHttp       = require('chai-http');
const should         = chai.should();
const app            = express();
const AvaliacaoService = app.services.avaliacao;

chai.use(chaiHttp);


describe('Avaliação', () => {


    // before(() => {
    //     return AvaliacaoService.excluirTodasEmpresas()
    //
    // });


    describe('inclusão ', () => {

        it('1 - incluir positivo sem comentário', () => {

            const empresaId = 7;
            const usuarioId = 1;

            const avaliacao  = {
               empresaId,
                usuarioId,
                aprovada : true
            };


            return chai.request(app).post('/api/v1/avaliacao/cadastrar').send(avaliacao)
                .then(res => {
                    res.should.have.status(200);
                    res.body.vigente.should.equal(true);

                })
        });
        it('2 - incluir positivo com comentário', () => {

            const empresaId = 7;
            const usuarioId = 1;

            const avaliacao  = {
               empresaId,
                usuarioId,
                comentario: 'teste',
                aprovada : true
            };


            return chai.request(app).post('/api/v1/avaliacao/cadastrar').send(avaliacao)
                .then(res => {
                    res.should.have.status(200);
                    res.body.vigente.should.equal(true);

                })
        });


    });

});
