const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pluginName = 'codeblock'

module.exports = {
  entry: {
    'plugin': './src/index.js',
    'plugin.min': './src/index.js'
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, './dist', pluginName),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugins: process.env.NODE_ENV !== "production" ? [] : [
    new CopyWebpackPlugin([{
      from: path.join(__dirname, './LICENSE'),
      to: path.join(__dirname, './dist', pluginName)
    }])
  ]
}
