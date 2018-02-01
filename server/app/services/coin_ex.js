const axios = require('axios');

module.exports = (app) => {
  
  
  const service = {};
  
  
  service.recuperarOfertas                  = (moedaCompra, limite) => {
  
    const moedaVenda =  'BCH';
    
    return axios.get(`https://api.coinex.com/v1/market/depth?market=${moedaCompra}${moedaVenda}&limit=${limite}&merge=0`)
    .then(response => {
      // console.log("response", moedaCompra, response.data.data);
      return response.data.data;
    });
   
    
  };
  
 
  
  
  return service;
  
};

