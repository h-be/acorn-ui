const path = require('path')
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: 'localhost',
    disableHostCheck: true,
  },
  node: {
    fs: 'empty',
  },
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
