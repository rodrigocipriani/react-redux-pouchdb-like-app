/**
 * Servidor Express
 *
 * todo: Preencher descrições de cada bloco de código
 * todo: Fazer o 'modRewrite' funcionar corretamente
 */

const path = require('path');
const config = require('./config');
const express = require('express');
const cors = require('cors');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const modRewrite = require('connect-modrewrite');
// const erro         = require('bb-common/error/erro');
const morgan = require('morgan');
const redis = require('redis');
const auth = require('../app/security/auth')();
// const acesso       = require('bb-common/access/loader');
const ejs = require('ejs');
// const uuidv4       = require('uuid/v4');
// const cookie       = require('cookie-signature');
const redisStore = require('connect-redis')(session);

/**
 *
 */
const redisClient = redis.createClient(config.redis.port, config.redis.host, {
  auth_pass     : config.redis.pass,
  no_ready_check: true
});

module.exports = () => {
  /**
   *
   */
  const app = express();

  /**
   *
   */
  const port = process.env.PORT || config.port;
  app.set('port', port);

  /**
   *
   */
  // app.set('views', './app/views');
  // app.engine('html', ejs.renderFile);
  // app.set('view engine', 'html'); // ejs

  /**
   * Reescrevendo a url para sempre cair no index.html
   * (correção refresh da tela)
   * */
  app.use(
    modRewrite([
      '!\\api/|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.woff2|\\.ttf|\\.manifest$ /index.html [L]'
    ])
  );

  /**
   * Servir a aplicação no frontend
   * */
  app.use(express.static(config.publicFolder));

  /**
   * compressão do response, performance
   */
  app.use(compression());
  app.use(morgan('dev'));

  /**
   *
   */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  /**
   *
   */
  app.use(cookieParser());

  /**
   *
   */
  const configuracaoRedis = config.redis;
  configuracaoRedis.client = redisClient;

  /**
   *
   */
  // app.get('*', (req, res, next) => {
  //
  //   if (req.headers.token) {
  //     const cookieAssinado  = cookie.sign(req.headers.token, config.secretSession);
  //     req.headers['cookie'] = `Disec=s:${cookieAssinado}`;
  //
  //   }
  //
  //   next()
  //
  // });

  /**
   *
   */
  app.use(
    session({
      // genid            : (req) => {
      //   if (req.headers.token) return req.headers.token;
      //   return uuidv4()
      // },
      secret           : config.secretSession,
      store            : new redisStore(configuracaoRedis),
      resave           : false,
      saveUninitialized: false,
      name             : 'BWL'
    })
  );

  /**
   *
   */
  app.use(auth.initialize());
  app.use(auth.session());
  // app.use(acesso.carregarSistema({codigoSistema: config.codigoSistema}));

  /**
   *
   */
  app.use(helmet.hidePoweredBy({ setTo: 'Cobol' }));

  /**
   *
   */
  consign({ cwd: path.join(process.cwd(), 'app') })
    .include('models/models.js')
    .then('utils')
    .then('services')
    .then('controllers')
    .then('routes')
    .into(app);

  /**
   *
   */
  app.get('*', (req, res) => {
    console.log('ROute/path not found');
    if (req.xhr) return res.status(404).send({ message: 'Endereço inexistente' });
    return res.status(404).render('404.ejs');
  });

  /**
   * Tratamento de erros
   */
  // app.use(erro.handler({token: config.accessToken}));

  return app;
};
