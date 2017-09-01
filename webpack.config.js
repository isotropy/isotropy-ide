const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: './src/clientRenderer.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  node: {
    module: "empty",
    fs: "empty",
    net: "empty"
  },
  plugins: [
    new CopyWebpackPlugin([
      {
          from: 'node_modules/monaco-editor/min/vs',
          to: 'vs',
      }
    ]),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/, /dist/],
      use: [
        {
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: [['es2015', { modules: false }], 'react'],
          }
        }
      ],
    }]
  }
};
