const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  // object to configure webpack
  mode: 'development',
  target: 'web',
  devtool: 'cheap-module-source-map', // lets us see original code in browser
  entry: './src/index',
  stats: 'minimal',
  output: {
    // doesnt output code in dev mode
    //still have to declare paths
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js', // for html reference
  },
  devServer: {
    client: { overlay: true },
    historyApiFallback: true,
    // all requests sent to index.html -> handle deep links with react-router
    allowedHosts: 'all',
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
