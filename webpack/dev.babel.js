const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const dllPath = path.join(process.cwd(), 'node_modules', 'app-dll')
const manifestPath = path.join(dllPath, 'vendor-manifest.json');

module.exports = {
  entry: {
    main: [
      // necessary for hot reloading with IE:
      'eventsource-polyfill',
      // listen to code updates emitted by hot middleware:
      'webpack-hot-middleware/client',
      // your code:
      path.join(process.cwd(), 'index.js'),
    ]
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre'],
        },
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath),
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      templateContent: templateContent(),
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
};

function templateContent() {
  const html = fs.readFileSync(
    path.resolve(process.cwd(), 'app', 'index.html')
  ).toString();

  const doc = cheerio(html);
  const body = doc.find('body');
  body.append(`<script type="text/javascript" src='/vendor.dll.js'></script>`)
  return doc.toString();
}
