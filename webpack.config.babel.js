import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const config = {
  entry: {
    main: './app.js',
    vendor: 'moment',
  },
  output: {
    filename: '[chunkhash].[name].js',
    path: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ],
};

export default config;
