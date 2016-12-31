import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const PORT = 3000;

const config = {
  entry: {
      main: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${PORT}`,
        'webpack/hot/only-dev-server',
        path.join(process.cwd(), 'index.js'),
      ]
  },
  output: {
    filename: '[hash].[name].js',
    path: path.join(process.cwd(), 'dist'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true, //important for performance
          plugins: ["transform-regenerator"],
          presets: ["react", "es2015", "stage-0"]
        }
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DllReferencePlugin({
        context: path.join(process.cwd()),
        manifest: require('example-dll/vendor-manifest.json')
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
