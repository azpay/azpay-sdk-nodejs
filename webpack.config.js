const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'lib/azpay.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'azpay.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      },
    }],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
