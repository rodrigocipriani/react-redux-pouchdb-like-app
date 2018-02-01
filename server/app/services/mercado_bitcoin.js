const axios = require('axios');

module.exports = (app) => {
  
  
  const service = {};
  
  
  service.recuperarOfertas                  = (moeda) => {
  
    // console.log("entrou", moeda);
    return axios.get(`https://www.mercadobitcoin.net/api/${moeda}/orderbook/`)
    .then(response => {
      // console.log("response", response);
      return response.data;
    });
   
    
  };
  
 
  
  
  return service;
  
};

