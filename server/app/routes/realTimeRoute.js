
module.exports = (app) => {
  const realTimeController = app.controllers.realTimeController;
  const isLogged = require('../passport/isLogged');

  app.route('/api/realTime')
        // .all(isLogged(app)) // desta forma verifica o login
        .get(realTimeController.findAll);

  app.route('/api/criarlista/server/:tamanho')
    .get(realTimeController.criarlistaServer);

  app.route('/api/criarlista/classic/:tamanho')
        .get(realTimeController.criarlistaClassic);

  app.route('/api/reset')
        .get(realTimeController.reset);
};
