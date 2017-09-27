/**
 * Created by f9329476 on 01/02/2017.
 */

const config = require('../../config/config');
// const acesso = require('bb-common/access/acesso');

module.exports = app => {
  const controller = app.controllers.avaliacao;

  // app.route(`${config.apiUrl}/v1/deslocamento/listar/proprias/vigentes`)
  //   // .get( controller.consultarIndicador);
  //   .get(acesso.validarAcesso(3, { token: config.accessToken }), controller.consultarIndicador);

  app.route(`${ config.apiUrl }/v1/avaliacao/cadastrar`).post(controller.avaliarEmpresa);

  app.route(`${ config.apiUrl }/v1/avaliacao/consultar/usuario/todas`).get(controller.consultarAvaliacoesAtuaisUsuario);
};
