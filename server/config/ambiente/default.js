const path = require('path');

module.exports = {
  publicFolder     : path.join(process.cwd(), '..', 'client', 'build'),
  corsOriginsAccept: ['*'],
  port             : 3010,
  apiUrl           : '/api',
  codigoSistema    : 1,
  redis            : {
    host  : 'redis-11942.c2.eu-west-1-3.ec2.cloud.redislabs.com',
    port  : 11942,
    pass  : '',
    // pass  : process.env.REDIS_PASSWD,
    client: ''
    // ttl :  260
  },
  // postgres     : {
  //     usuario: 'pthhbdxn',
  //     senha  : 'YGpZA5KEVBMht0saqWGePAHvOAb3CWtp',
  //     db     : 'postgres',
  //     config : {
  //         host           : 'horton.elephantsql.com',
  //         port           : 5432,
  //         dialect        : 'postgres',
  //         dialectOptions : {
  //             ssl: true,
  //         },
  //         freezeTableName: true,
  //         define         : {timestamps: false},
  //         pool           : {
  //             maxConnections: 10,
  //             minConnections: 0,
  //             maxIdleTime   : 60
  //         }
  //     }
  // },
  postgres: {
    usuario: process.env.POSTGRES_USER,
    senha  : process.env.POSTGRES_PASSWORD,
    db     : process.env.POSTGRES_DB,
    config : {
      host           : process.env.POSTGRES_HOST,
      port           : process.env.POSTGRES_PORT,
      dialect        : 'postgres',
      //   dialectOptions: {
      //     ssl: true
      //   },
      // logging : false,
      freezeTableName: true,
      define         : { timestamps: false },
      pool           : { max: 10, min: 0, idle: 60 }
    }
  },
  auth: {
    facebookId  : 439491383089499,
    facebookPass: 'a5336a5f1a89691ed0ef858db90b5efa'
  },
  secretSession: 'segredo de u eh rl',
  secretCookie : 'ma vai pra laaaaa',
  lib          : {
    bcrypt: 'bcrypt'
  }
};
