

module.exports = function (app) {
  const service = {};
  const realTimeModel = app.models.modelo.realTimeModel;

  service.findAll = () => {
    return realTimeModel.findAll();
  };

  return service;
};
