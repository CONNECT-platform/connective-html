import path from 'path';
import config from './base.conf';
const merge = require('webpack-merge');

export default merge(config, {
  entry: path.resolve(__dirname, '../../samples/index.tsx'),
  mode: 'development',
  output: {
    filename: 'test.bundle.js',
    path: path.resolve(__dirname, '../../dist'),
  }
});
