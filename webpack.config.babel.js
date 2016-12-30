import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config = {
  entry: {
    main: path.resolve(__dirname, 'index.js'),
    vendor: 'react'
  },
  output: {
    filename: '[chunkhash].[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'

      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor']
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'index.html')
    }),
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    host: 'localhost',
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    clientLogLevel: 'error',
    quiet: true,
    historyApiFallback: true
  }
};

export default config;
