import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const PORT = 3000;

const config = {
  entry: {
    main: path.join(process.cwd(), 'index.js'),
  },
  output: {
    filename: '[hash][name].js',
    path: path.join(process.cwd(), 'build'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: true,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), 'index.html'),
    }),
  ],
};

export default config;
