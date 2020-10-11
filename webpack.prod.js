const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'source-map',
  // plugins: [
  //   // only relevant for the production versions
  //   // however leave in common to prevent build errors
  //   new webpack.DefinePlugin({
  //     __PROJECTS_DNA_ADDRESS__: process.env.PROJECTS_DNA_ADDRESS,
  //   }),
  // ],
})
