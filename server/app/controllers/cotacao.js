// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
// const config = require('../../config/config');

const BrError = require('../helpers/error_constructor');

const corretorasCadastradas = {
  COIN_BR        : 1,
  COIN_EX        : 3,
  CHANGELLY      : 4,
  MERCADO_BITCOIN: 2
};

module.exports = (app) => {
  const BitcoinTradeService   = app.services.bitcoin_trade;
  const ChangellyService      = app.services.changelly;
  const CoinBrService         = app.services.coin_br;
  const CoinExService         = app.services.coin_ex;
  const MercadoBitcoinService = app.services.mercado_bitcoin;
  
  // const sequelize  = app.models.models.sequelize;
  const controller = {};
  
  controller.calcularCompra = (req, res, next) => {
    
    // console.log('req', req.query);
    const {valor, moeda} = req.query;
    let corretoras       = [];
    
    console.log(`Quero R$ ${valor} em ${moeda}`);
    
    // corretoras.push(consultarCotacoesCoinBr(valor, moeda));
    corretoras.push(consultarOrdensMercadoBitcoin(valor, moeda));
    const resultados = Promise.all(corretoras);
    
    resultados.then(data => {
      console.log('MEU', data);
      res.status(200).send(data);
    }).catch(err => {
      console.log('aqui', err);
      return next(new BrError(err));
    });
    
  };
  /**
   * Busca cotações para Coin BR
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  controller.consultarCotacoesCoinBr = async (req, res, next) => {
    const cotacoes = await CoinBrService.recuperarCotacoesCoinBr();
    console.log('cotacoes Coin Br', cotacoes);
    if (!cotacoes) {
      return next(new BrError('Falha ao buscar cotações para Coin Br'));
    }
    res.json(cotacoes);
  };
  controller.consultarOrdensBtcTrade       = (req, res, next) => {
    return BitcoinTradeService.recuperarOfertas()
    .then((cotacoes) => {
      console.log('cotacoes', cotacoes.data);
      res.status(200).send(cotacoes.data);
    }).catch(err => {
      console.log('aqui', err);
      
      return next(new BrError(err));
    });
  };
  controller.consultarOrdensMercadoBitcoin = (req, res, next) => {
    const {valor, moeda} = req.query;
    const comissao       = 0.007;
    const moedasVendidas = ['BTC', 'BCH', 'LTC'];
    const taxas          = [0.00015, 0.00015, 0.00065];
    const cotacoes       = [];
    
    console.log(`Quero R$ ${valor} em ${moeda}`);
    
    for (const [i, moedaAtual] of moedasVendidas.entries()) {
      console.log(`Comprar em MercadoBitcoin ${moedaAtual}`);
      cotacoes.push(
        MercadoBitcoinService.recuperarOfertas(moedaAtual)
        .then(cotacoes => calcularQuantidadeValor(cotacoes.asks, valor, comissao))
        .then(quantidade => calcularTransferencia(quantidade, taxas[i], moedaAtual, moeda))
        .then(quantidade => calcularMoedas(quantidade, moedaAtual, moeda))
      );
    }
    
    const resultados = Promise.all(cotacoes);
    
    resultados.then(data => {
      // console.log('MEU', data);
      res.status(200).send(cotacoes);
    }).catch(err => {
      console.log('aqui', err);
      return next(new BrError(err));
    });
  };
  
  const calcularQuantidadeValor       = (ofertas, valor, comissao) => {
    let valorRestante   = valor;
    let quantidadeTotal = 0;
    
    for (const oferta of ofertas) {
      const quantidadePossivel = valorRestante / oferta[0];
      
      if (quantidadePossivel <= oferta[1]) {
        quantidadeTotal += quantidadePossivel;
        break;
      } else {
        valorRestante -= oferta[0] * oferta[1];
        quantidadeTotal += oferta[1];
      }
    }
    
    quantidadeTotal *= (1 - comissao);
    
    return quantidadeTotal;
  };
  const calcularMoedas                = (quantidade, moedaAtual, moedaNova) => {
    
    let conversores = [];
    let quantidadesFormatadas = {};
    let quantidadesFormatadas2 = {};
    
    conversores.push(calcularMoedasCoinEx(quantidade, moedaAtual, moedaNova));
    // conversores.push(calcularMoedasChangelly(quantidade, moedaAtual, moedaNova));
    
    return Promise.all(conversores)
    .then (dados => {
      quantidadesFormatadas2[corretorasCadastradas.COIN_EX] = dados[0];
      console.log("quantidadesFormatadas", quantidadesFormatadas2);
      return dados
    });
    
  };
  const calcularMoedasChangelly       = (quantidade, moedaAtual, moedaNova) => {
    
    if (moedaAtual === moedaNova) return quantidade;
    
    return ChangellyService.recuperarOfertas(moedaNova, 10);
    
    
  };
  const calcularMoedasCoinEx          = (quantidade, moedaAtual, moedaNova) => {
    
    if (moedaAtual === moedaNova) return quantidade;
   
    switch (moedaAtual) {
      case 'BCH':
        return CoinExService.recuperarOfertas(moedaNova, 10)
        .then(cotacoes => converterMoeda(cotacoes.bids, quantidade))
        .then(novaQuantidade => calcularMoedasCoinEx(novaQuantidade, moedaNova, moedaNova));
      default:
        return CoinExService.recuperarOfertas(moedaNova, 10)
        .then(cotacoes => converterMoeda(cotacoes.asks, quantidade))
        .then(novaQuantidade => calcularMoedasCoinEx(novaQuantidade, 'BCH', moedaNova));
    }
    
  };
  const calcularTransferencia         = (quantidade, taxa, moedaAtual, moedaNova) => {
    if (moedaAtual === moedaNova) return quantidade;
    
    return quantidade - taxa;
  };
  const consultarCotacoesCoinBr       = (valor, moedaNova) => {
    
    let quantidadesCalculadas = [];
    
    return CoinBrService.recuperarCotacoesCoinBr()
    .then(cotacoes => {
      for (let [moedaAtual, valores] of Object.entries(cotacoes)) {
        console.log(`Comprar em CoinBr  ${moedaAtual} ${valores}`);
        const quantidade = valor / valores[0];
        quantidadesCalculadas.push(calcularMoedas(quantidade, moedaAtual, moedaNova));
      }
      return Promise.all(quantidadesCalculadas);
    });
    
  };
  const consultarOrdensMercadoBitcoin = (valor, moedaNova) => {
    
    const comissao              = 0.007;
    const moedasVendidas        = ['BTC', 'BCH', 'LTC'];
    const taxas                 = [0.00015, 0.00015, 0.00065];
    const quantidadesCalculadas = [];
    
    for (const [i, moedaAtual] of moedasVendidas.entries()) {
      console.log(`Comprar em MercadoBitcoin ${moedaAtual}`);
      quantidadesCalculadas.push(
        MercadoBitcoinService.recuperarOfertas(moedaAtual)
        .then(cotacoes => calcularQuantidadeValor(cotacoes.asks, valor, comissao))
        .then(quantidade => calcularTransferencia(quantidade, taxas[i], moedaAtual, moedaNova))
        .then(quantidade => {
          return calcularMoedas(quantidade, moedaAtual, moedaNova)
        })
      );
    }
    
    return Promise.all(quantidadesCalculadas);
    
    
  };
  const converterMoeda                = (ofertas, quantidadeOrigem) => {
    let quantidadeRestante = quantidadeOrigem;
    let quantidadeDestino  = 0;
    
    // console.log("q", ofertas);
    
    for (const oferta of ofertas) {
      const quantidadePossivel = quantidadeRestante / Number(oferta[0]);
      
      if (quantidadePossivel <= oferta[1]) {
        quantidadeDestino += quantidadePossivel;
        break;
      } else {
        quantidadeRestante -= Number(oferta[0]) * Number(oferta[1]);
        quantidadeDestino += Number(oferta[1]);
      }
    }
    // console.log("quantidadeDestino", quantidadeDestino);
    return quantidadeDestino;
  };
  const rastrearCaminho               = (quantidadesFormatadas) => {
    quantidadesFormatadas.push({
      corretora: corretorasCadastradas.MERCADO_BITCOIN,
      moeda : moedaAtual,
      quantidade : quantidade
    });
  };
  
  return controller;
};

