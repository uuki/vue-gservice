const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = Object.assign({
  entry: './src',
  output: {
    library: 'VueGService',
    libraryTarget: 'umd',
    filename: 'vue-gservice.js',
    path: path.resolve(__dirname, '../', 'dist'),
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    })
  ]
}, require('./webpack.base'))
