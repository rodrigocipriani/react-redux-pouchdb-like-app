const axios = require('axios');

module.exports = (app) => {
  
  
  const service = {};
  
  
  service.recuperarQuantidadeMoeda                  = (valor, moeda) => {
  
    return axios.get(`https://api.bitcointrade.com.br/v1/market/estimated_price?amount=${valor}&currency=${moeda}&type=buy`)
    .then(response => {
      return response.data;
    });
   
    
  };
  service.recuperarOfertas                  = () => {
  
    return axios.get('https://api.bitcointrade.com.br/v1/public/BTC/orders')
    .then(response => {
      return response.data;
    });
   
    
  };
  
  
  return service;
  
};

