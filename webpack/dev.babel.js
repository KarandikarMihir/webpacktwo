import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const PORT = 3000;

const config = {
  entry: {
      main: path.join(process.cwd(), 'index.js'),
      vendor: 'react',
  },
  output: {
    filename: '[chunkhash].[name].js',
    path: path.join(process.cwd(), 'dist'),
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
      template: path.join(process.cwd(), 'index.html')
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    contentBase: path.join(process.cwd(), "dist"),
    compress: true,
    port: PORT,
    clientLogLevel: 'error',
    quiet: true,
    historyApiFallback: true,
  }
};

export default config;
