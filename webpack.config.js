const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      // { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(png|jpe?g|gif)$/i, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin([
      { from: './icons/', to: './icons/' },
      { from: './manifest.json', to: '.' },
      { from: './src/popup.html', to: '.' },
      { from: './src/popup.css', to: '.' },
    ]),
    // Sentry can't handle sourcemaps in webextensions anyway..
    // new SentryWebpackPlugin({
    //   include: '.',
    //   ignoreFile: '.sentrycliignore',
    //   ignore: ['node_modules', 'webpack.config.js'],
    //   configFile: 'sentry.properties',
    // }),
  ],
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',
  devtool: 'source-map',
};
