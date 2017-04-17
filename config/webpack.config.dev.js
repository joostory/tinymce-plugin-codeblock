var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    'highlightjs': '(typeof hljs !== "undefined")? hljs:{}',
    'codemirror/lib/codemirror': '(typeof CodeMirror !== "undefined")? CodeMirror:{}'
  }
}
