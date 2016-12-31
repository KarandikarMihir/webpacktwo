import webpack from 'webpack';
import path from 'path';
import pkg from '../package.json';

const outputPath = path.join(process.cwd(), 'build', 'dll')

const config = {
  context: process.cwd(),
  entry: Object.keys(pkg.dependencies),
  devtool: 'eval',
  output: {
    filename: 'dll.vendor.js',
    path: outputPath,
    publicPath: '/',
    library: 'vendor',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor',
      path: path.join(outputPath, 'vendor-manifest.json'),
    }),
  ],
}

export default config;
