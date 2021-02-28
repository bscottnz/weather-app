const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

module.exports = {
  entry: './src/js/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      favicon: `./src/assets/favicon.png`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
  },
};
