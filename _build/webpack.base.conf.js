const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const combineLoaders    = require('webpack-combine-loaders');
const BASE_PATH = path.join('./');

var config = {

  entry: [
    path.resolve(BASE_PATH, 'src/app/main.jsx')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(BASE_PATH, 'dist/')
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".jsx", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        include: [
          path.resolve('src'),
        ],
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {test: /\.jsx$/, loader: "source-map-loader"}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ReactClient',
      filename: 'index.html',
      template: path.resolve(BASE_PATH, 'src/index.html')
    })
  ]
};


var server = new WebpackDevServer(webpack(config), {
  // webpack-dev-server options
  contentBase: "/dist",
  // Can also be an array, or: contentBase: "http://localhost/",
  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
  compress: true,
  staticOptions: {},
  quiet: false,
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {colors: true}
});
server.listen(3000, "localhost", function () {
});

module.exports = config;
