module.exports = {
    publicFolder     : './client/build',
    corsOriginsAccept: ['*'],
    port             : 3010,
    apiUrl           : '/api',
    codigoSistema : 1,
    redis        : {
        host  : 'redis-11942.c2.eu-west-1-3.ec2.cloud.redislabs.com',
        port  : 11942,
        pass  : '',
        // pass  : process.env.REDIS_PASSWD,
        client: '',
        // ttl :  260
    },
    postgres     : {
        usuario: 'pthhbdxn',
        senha  : 'YGpZA5KEVBMht0saqWGePAHvOAb3CWtp',
        db     : 'postgres',
        config : {
            host           : 'horton.elephantsql.com',
            port           : 5432,
            dialect        : 'postgres',
            dialectOptions : {
                ssl: true,
            },
            freezeTableName: true,
            define         : {timestamps: false},
            pool           : {
                maxConnections: 10,
                minConnections: 0,
                maxIdleTime   : 60
            }
        }
    },
    auth : {
        facebookId :439491383089499,
        facebookPass :'a5336a5f1a89691ed0ef858db90b5efa'
    },
    secretSession: 'segredo de u eh rl',
    secretCookie : 'ma vai pra laaaaa',
    lib       : {
        bcrypt: 'bcrypt'
    },

};
