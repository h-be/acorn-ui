const path = require('path')
const webpack = require('webpack')

if (!process.env.PROJECTS_DNA_ADDRESS) {
  throw new Error(
    'PROJECTS_DNA_ADDRESS env var is not set, Set it like: export PROJECTS_DNA_ADDRESS="\'AADJI\'"'
  )
}

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    host: 'localhost',
    disableHostCheck: true,
  },
  plugins: [
    // only relevant for the production versions
    // however leave in common to prevent build errors
    new webpack.DefinePlugin({
      __PROJECTS_DNA_ADDRESS__: process.env.PROJECTS_DNA_ADDRESS,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: (url, resourcePath) => {
                // resourcePath - path to css file

                // Don't handle `splash-image.png` urls
                if (url.includes('splash-image.png')) {
                  return false
                }

                return true
              },
            },
          },
        ],
      },
    ],
  },
}
