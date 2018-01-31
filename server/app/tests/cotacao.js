const chai                          = require('chai');
const express                       = require('../../config/express');
const chaiHttp                      = require('chai-http');
const should                        = chai.should();
const app                           = express();

chai.use(chaiHttp);


describe('cotações', () => {
  
  describe('BITCOIN TRADE', () => {
    it.skip('1 - compra e venda   ', () => {
      
      return chai.request(app).get('/api/v1/cotacao/bitcoin-trade/consultar')
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    it.skip('2 - compra e venda   ', () => {
      
      const dados = {
          valor : 10537.12,
          moeda : 'BTC'
      };
      
      return chai.request(app).get('/api/v1/compra/moeda/consultar').query(dados)
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    it('3 - compra e venda   ', () => {
      
      const dados = {
          valor : 10537.12,
          moeda : 'BTC'
      };
      
      return chai.request(app).get('/api/v1/cotacao/mercado-bitcoin/consultar').query(dados)
      .then(res => {
        res.should.have.status(200);
        
      });
    });
    
  });
  
});