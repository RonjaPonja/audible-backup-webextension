const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      // { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader' },
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './icons/', to: './icons/' },
      { from: './manifest.json', to: '.' },
      { from: './src/popup.html', to: '.' },
    ]),
  ],
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',
  devtool: 'source-map',
}
