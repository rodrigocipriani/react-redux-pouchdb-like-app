const axios = require('axios');

module.exports = (app) => {
    
  const service = {};
  
  service.consultarCotacoesCoingBr = async () => {
    const urlCoinBr =  'https://www.coinbr.net/ticker?coin=all';
    const {data} = await axios.get(urlCoinBr);
    return data;
  };
  
  return service;
};

