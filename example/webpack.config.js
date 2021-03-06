var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:4000/',
    'webpack/hot/only-dev-server',
    './src/App.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
      include: [path.join(__dirname,'..')]
    }]
  },
  query: {
    presets: ['es2015','react']
  }
};
