/* eslint-disable linebreak-style */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CacheManifestPlugin = require('cachemanifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const manifest = require('./assets/manifest.json');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const withHash = IS_PRODUCTION;
const config = {
  assetsFolder: path.resolve(__dirname, 'assets'),
  imageFolder: path.resolve(__dirname, 'assets'),
  bundleName: `[name]${withHash ? '-[hash]' : ''}.bundle.js`,
  vendorsName: `vendors${withHash ? '-[hash]' : ''}.js`,
  cssBundleName: `[name]-style${withHash ? '-[hash]' : ''}.css`,
  buildFolder: path.resolve(__dirname, 'build'),
  sourceFolder: path.resolve(__dirname, IS_PRODUCTION ? './src' : './src'),
  entryPoint: './main.js',
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
  },
  output: {
    path: config.buildFolder,
    // publicPath: "http://cdn.example.com/assets/[hash]/",
    publicPath: '/',
    filename: config.bundleName,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [config.sourceFolder, 'node_modules'],
  },
  watch: !config.isProduction,
  devtool: !config.isProduction ? 'cheap-module-source-map' : 'eval',
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
    rules: [
      {
        test: /\.(js|jsx)$/,
        // test: /.jsx?$/, // Match both .js and .jsx
        loader: 'babel-loader',
        exclude: [/node_modules/],
        // query: {
        //   plugins: [
        //     require('babel-plugin-transform-class-properties'),
        //     require('babel-plugin-syntax-decorators'),
        //     require('babel-plugin-transform-decorators-legacy'),
        //   ],
        //   presets: [['es2015', { modules: false }], 'react', 'stage-0'],
        //   env: {
        //     development: {
        //       presets: ['react-hmre'],
        //     },
        //   },
        // },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(json)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};

/**
 * Plugins
 */
webpackConfig.plugins.push(new HtmlWebpackPlugin({ template: config.indexHtml }));
webpackConfig.plugins.push(
  new ExtractTextPlugin({
    filename: config.cssBundleName,
    allChunks: true,
  }),
);
webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    filename: config.vendorsName,
    minChunks: 2,
  }),
);

/*
 * If production
 * */
console.log('config.isProduction', config.isProduction);
if (config.isProduction) {
  webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackConfig.plugins.push(
    new CacheManifestPlugin({
      // cache: ['main.js'],
      network: ['*'],
      // fallback: ['failwhale.jpg'],
      // settings: ['prefer-online'],
      exclude: ['manifest.json', /node_modules/], // Exclude file.txt and all .js files
      // exclude: ['file.txt', /.*\.js$/],  // Exclude file.txt and all .js files
      output: 'offline.manifest',
    }),
  );
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([{ from: config.assetsFolder }], {
      ignore: ['index.html', 'manifest.json'],
      copyUnmodified: true,
    }),
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
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
