import webpack from 'webpack';
import path from 'path';
import pkg from '../package.json';

const config = {
  entry: Object.keys(pkg.dependencies),
  output: {
    filename: 'dll.vendor.js',
    path: path.join(process.cwd(), 'dist', 'dll'),
    library: 'vendor',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(process.cwd(), 'node_modules', 'example-dll', 'vendor-manifest.json'),
      name: 'vendor',
      context: path.join(process.cwd())
    }),
  ],
}

export default config;
