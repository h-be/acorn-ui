const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      __APP_NAME__: JSON.stringify('test-app'),
      __ADMIN_PORT__: 1234,
      __APP_PORT__: 8888,
    }),
  ],
})
