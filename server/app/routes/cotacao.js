/**
 * Created by f9329476 on 27/01/2018.
 */

const config = require('../../config/config');
// const acesso = require('bb-common/access/acesso');

module.exports = app => {
  const controller = app.controllers.cotacao;
  
  // app.route(`${config.apiUrl}/v1/deslocamento/listar/proprias/vigentes`)
  //   // .get( controller.consultarIndicador);
  //   .get(acesso.validarAcesso(3, { token: config.accessToken }), controller.consultarIndicador);
  
  app.route(`${ config.apiUrl }/v1/cotacao/coin-br/consultar`).get(controller.consultarCotacoesCoingBr);
  app.route(`${ config.apiUrl }/v1/cotacao/bitcoin-trade/consultar`).get(controller.consultarOrdensBtcTrade);
  app.route(`${ config.apiUrl }/v1/cotacao/mercado-bitcoin/consultar`).get(controller.consultarOrdensMercadoBitcoin);
  app.route(`${ config.apiUrl }/v1/compra/moeda/consultar`).get(controller.calcularCompra);
  

};
