module.exports = {
  publicFolder: '../client/build',
  port: 80,
  urls: {
    api: 'http://localhost:3000/api',
  },
  couchDB: {
    urlConnector: 'https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/rodrigocipriani',
    dBname: 'rodrigocipriani',
  },
  mailer: {
    auth: {
      user: 'usr.war@gmail.com',
      pass: 'aerolitos51',
    },
    defaultFromAddress: 'nao_responda <nao_responda@guerra.com>',
  },
  redis: {
    host: 'redis-11942.c2.eu-west-1-3.ec2.cloud.redislabs.com',
    port: 11942,
    pass: '',
    // pass  : process.env.REDIS_PASSWD,
    client: '',
    // ttl :  260
  },
  postgres: {
    usuario: 'pthhbdxn',
    senha: 'YGpZA5KEVBMht0saqWGePAHvOAb3CWtp',
    db: 'pthhbdxn',
    config: {
      host: 'horton.elephantsql.com',
      port: 5432,
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      },
      // logging : false,
      freezeTableName: true,
      define: { timestamps: false },
      pool: { max: 9, min: 0, idle: 10000 },
    },
  },
  // postgres: {
  //   usuario: process.env.POSTGRES_USER,
  //   senha  : process.env.POSTGRES_PASSWD,
  //   db     : 'like',
  //   config : {
  //     host           : 'localhost',
  //     port           : 5432,
  //     dialect        : 'postgres',
  //     freezeTableName: true,
  //     define         : { timestamps: false },
  //     pool           : { max: 100, min: 0, idle: 10000 }
  //   }
  // },
  secretSession: 'segredo de u eh rl',
  secretCookie: 'ma vai pra laaaaa',
};
