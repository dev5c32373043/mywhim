const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: `${process.cwd()}/src`,
  entry: {
    main: ['./App.jsx', './scss/main.scss']
  },
  output: {
    path: `${process.cwd()}/dist/`,
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: false,
                minimize: NODE_ENV == 'production'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                sourceComments: NODE_ENV != 'production'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist/*.js', 'dist/*.css'], {
      root: process.cwd()
    }),
    new ExtractTextPlugin('styles-[hash].css'),
    new HtmlPlugin({ template: './index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  watch: NODE_ENV != 'production'
};
