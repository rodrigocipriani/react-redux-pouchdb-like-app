const axios = require('axios');

module.exports = (app) => {
    
  const service = {};
  
  service.recuperarCotacoesCoinBr = async () => {
    const urlCoinBr =  'https://www.coinbr.net/ticker?coin=all';
    const {data} = await axios.get(urlCoinBr);
    
    return formatarCotacoes(data);
    
  };
  
  return service;
};

const formatarCotacoes = (cotacoes) => {
  
  let cotacoesFormatadas = {};
  
  for (const cotacao of cotacoes) {
  
    const moeda = cotacao.coin.toUpperCase();
    
    cotacoesFormatadas[moeda] = [cotacao.sell, cotacao.buy];
  }
  
  return cotacoesFormatadas;
  
};