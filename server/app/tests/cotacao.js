const chai                          = require('chai');
const express                       = require('../../config/express');
const chaiHttp                      = require('chai-http');
const should                        = chai.should();
const app                           = express();

chai.use(chaiHttp);


describe('cotações', () => {
  
  describe('Simular Melhor Compra', () => {
    it.skip('1 - cotações bitcoin trade   ', () => {
      
      return chai.request(app).get('/api/v1/cotacao/bitcoin-trade/consultar')
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    it('2 - cotações geral   ', () => {
      
      const dados = {
          valor : 10537.12,
          moeda : 'BTC'
      };
      
      return chai.request(app).get('/api/v1/compra/moeda/consultar').query(dados)
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    it.skip('3 - cotações mercado bitcoin   ', () => {
      
      const dados = {
          valor : 10537.12,
          moeda : 'BTC'
      };
      
      return chai.request(app).get('/api/v1/cotacao/mercado-bitcoin/consultar').query(dados)
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    it.skip('4 - cotações coin br   ', () => {
      
      const dados = {
          valor : 10537.12,
          moeda : 'BTC'
      };
      
      return chai.request(app).get('/api/v1/cotacao/coin-br/consultar').query(dados)
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    
  });
  
});