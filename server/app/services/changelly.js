const axios = require('axios');

module.exports = (app) => {
  
  
  const service = {};
  
  
  service.recuperarOfertas                  = (moedaCompra, moedaVenda, limite) => {
    
    return axios.post(`http://api.changelly.com`, {
      "id": "test",
      "jsonrpc": "2.0",
      "method": "getExchangeAmount",
      "params": {
        "from": "eth",
        "to": "btc",
        "amount": "1"
      }
    })
    .then(response => {
      console.log("response", response);
      return response.data.data;
    });
   
    
  };
  
 
  
  
  return service;
  
};

