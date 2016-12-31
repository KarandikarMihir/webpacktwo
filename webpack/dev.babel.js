import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';

const PORT = 3000;
const dllPath = path.resolve(process.cwd(), 'node_modules', 'example-dll');
const manifestPath = path.join(dllPath, 'vendor-manifest.json');

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
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
    }]
  },
  plugins: [
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
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    contentBase: path.join(process.cwd(), 'build'),
    compress: true,
    port: PORT,
    clientLogLevel: 'error',
    quiet: true,
    historyApiFallback: true,
  },
};

function templateContent() {
  const html = fs.readFileSync(
    path.resolve(process.cwd(), 'app', 'index.html')
  ).toString();

  const doc = cheerio(html);
  const body = doc.find('body');
  body.append(`<script type="text/javascript" data-dll='true' src='/dll/dll.vendor.js'></script>`)
  return doc.toString();
}

export default config;
