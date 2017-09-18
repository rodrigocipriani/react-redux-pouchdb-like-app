const path = require('path');
const shell = require('gulp-shell');

(() => {
  console.log('fjdslkjfsdl fkjsa ldfk j');
  const runDev = () => {
    shell.task(
      [
        `${path.join(
          '.',
          'node_modules',
          '.bin',
          'webpack-dev-server',
        )} --progress --profile --colors --config webpack.config.js`,
      ],
      {
        cwd: path.join(__dirname, 'client'),
      },
    );
  };
})();

// module.exports = dev;
