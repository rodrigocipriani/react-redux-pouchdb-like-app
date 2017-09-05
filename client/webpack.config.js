/* eslint-disable linebreak-style */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const withHash = false;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const config = {
  assetsFolder: path.resolve(__dirname, 'assets'),
  imageFolder: path.resolve(__dirname, 'assets'),
  bundleName: `[name]${withHash ? '-[hash]' : ''}.bundle.js`,
  vendorsName: `vendors${withHash ? '-[hash]' : ''}.js`,
  cssBundleName: `[name]-style${withHash ? '-[hash]' : ''}.css`,
  buildFolder: path.resolve(__dirname, 'build'),
  sourceFolder: path.resolve(__dirname, IS_PRODUCTION ? './build' : './src'),
  entryPoint: './main.js',
  entryPointVue: './main.vue.js',
  indexHtml: path.join(__dirname, 'assets', 'index.html'),
  isProduction: IS_PRODUCTION,
  host: '0.0.0.0',
  port: 8080,
};

console.log(config, process.env.NODE_ENV);

const webpackConfig = {
  context: config.sourceFolder,
  entry: {
    app: config.entryPoint,
    appReact: config.entryPointVue,
  },
  output: {
    path: config.buildFolder,
    // publicPath: "http://cdn.example.com/assets/[hash]/",
    filename: config.bundleName,
  },
  resolve: {
    modules: [config.sourceFolder, 'node_modules'],
  },
  watch: true,
  devtool: config.isProduction ? 'cheap-module-source-map' : 'eval',
  devServer: {
    contentBase: config.sourceFolder,
    historyApiFallback: true,
    port: config.port,
    compress: config.isProduction,
    inline: !config.isProduction,
    hot: !config.isProduction,
    host: config.host,
    disableHostCheck: !config.isProduction,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
  module: {
    loaders: [
      {
        test: /\.vue\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015', { modules: false }],
            // 'react',
            'stage-0',
          ],
          plugins: ['transform-vue-jsx'],
        },
        // include: [
        //   config.sourceFolder,
        // ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /\.vue\.js$/],
        query: {
          presets: [
            ['es2015', { modules: false }],
            'react',
            'stage-0',
          ],
          // plugins: ['transform-vue-jsx'],
        },
        // include: [
        //   config.sourceFolder,
        // ],
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: { importLoaders: 1 },
          }],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: config.indexHtml }),
    new ExtractTextPlugin({
      filename: config.cssBundleName,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: config.vendorsName,
      minChunks: 2,
    }),
  ],
};

/*
* If production
* */
if (config.isProduction) {
  webpackConfig.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
  );
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
  );
  // webpackConfig.plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendors',
  //     filename: config.vendorsName,
  //     minChunks: 2,
  //   }),
  // );
}

/*
* If not production
* */
if (!config.isProduction) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

module.exports = webpackConfig;
