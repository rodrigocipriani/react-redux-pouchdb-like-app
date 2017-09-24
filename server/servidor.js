const http = require('http');
const app = require('./config/express')();
const cluster = require('cluster');
const config = require('./config/config');

const env = config.env;

if (cluster.isMaster && !env.isLocal) {
  // Count the machine's CPUs
  const workers = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }
} else {
  http.createServer(app).listen(app.get('port'), () => {
    console.log(`Servidor escutando na porta ${ app.get('port') }`); // eslint-disable no-console
    console.log(
      `Ambiente de${ env.isDevelopment ? ' Desenvolvimento' : '' }  ${ env.isLocal ? 'Desenvolvimento Local' : '' }`
    );
  });
}
