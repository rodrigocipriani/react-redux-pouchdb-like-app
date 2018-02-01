// const BrError   = require('bb-common/util/br-error');
// const BrRequest = require('bb-common/util/br-request');
// const config = require('../../config/config');

const BrError = require('../helpers/error_constructor');

module.exports = (app) => {
  const BitcoinTradeService   = app.services.bitcoin_trade;
  const CoinExService         = app.services.coin_ex;
  const MercadoBitcoinService = app.services.mercado_bitcoin;
  const CoinBrService = app.services.coin_br;

  // const sequelize  = app.models.models.sequelize;
  const controller = {};

  /**
   * Busca cotações para Coin BR
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  controller.consultarCotacoesCoingBr = async (req, res, next) => {
    const cotacoes = await CoinBrService.consultarCotacoesCoingBr();
    console.log('cotacoes Coin Br', cotacoes);
    if (!cotacoes) { return next(new BrError('Falha ao buscar cotações para Coin Br')); }
    res.json(cotacoes);
  };

  controller.calcularCompra = (req, res, next) => {
    console.log('req', req.query);
    const { valor, moeda } = req.query;

    return BitcoinTradeService.recuperarQuantidadeMoeda(valor, moeda)
    .then((quantidade) => {
      console.log('quantidade', cotacoes.data);
      res.status(200).send(cotacoes.data);
    }).catch(err => {
      console.log('aqui', err);

      return next(new BrError(err));
    });
  };
  controller.consultarOrdensBtcTrade = (req, res, next) => {
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
    const { valor, moeda } = req.query;
    const moedasVendidas = ['BTC', 'BCH', 'LTC'];
    const comissao       = 0.007;
    const taxa           = 0.0001582;
    const cotacoes         = [];

    for (const moedaAtual of moedasVendidas) {
      cotacoes.push(
        MercadoBitcoinService.recuperarOfertas(moedaAtual)
        .then(cotacoes => calcularQuantidadeValor(cotacoes.asks, valor, comissao))
        .then(quantidade => calcularTransferencia(quantidade, taxa, moedaAtual, moeda))
        .then(quantidade => calcularMoedas(quantidade, moedaAtual, moeda))
      );
    }

    console.log('ponto 2');
    const resultados = Promise.all(cotacoes);

    resultados.then(data => {
      console.log('MEU', data);
      res.status(200).send(cotacoes);
    }).catch(err => {
      console.log('aqui', err);
      return next(new BrError(err));
    });
  };

  const calcularQuantidadeValor = (ofertas, valor, comissao) => {
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
  const calcularMoedas          = (quantidade, moedaAtual, moedaNova) => {
    if (moedaAtual === moedaNova) return quantidade;

    switch (moedaAtual) {
    case 'BCH':
      return CoinExService.recuperarOfertas(moedaNova, 10)
        .then(cotacoes => converterMoeda(cotacoes.bids, quantidade))
        .then(novaQuantidade => calcularMoedas(novaQuantidade, moedaNova, moedaNova));
    default:
      return CoinExService.recuperarOfertas(moedaNova, 10)
        .then(cotacoes => converterMoeda(cotacoes.asks, quantidade))
        .then(novaQuantidade => calcularMoedas(novaQuantidade, 'BCH', moedaNova));
    }
  };
  const calcularTransferencia   = (quantidade, taxa, moedaAtual, moedaNova) => {
    if (moedaAtual === moedaNova) return quantidade;

    return quantidade - taxa;
  };
  const converterMoeda          = (ofertas, quantidadeOrigem) => {
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

    return quantidadeDestino;
  };

  return controller;
};

