const path = require('path');
      webpack = require('webpack');
      MiniCssExtractPlugin = require('mini-css-extract-plugin');
      CopyWebpackPlugin = require('copy-webpack-plugin');
      HtmlWebpackPlugin = require('html-webpack-plugin');
      HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
      fs = require('fs');
      // jquery = require('jquery');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// const PAGES_DIR = `${PATHS.src}/pug/pages/`;
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));


let base = {

  externals: {
    paths: PATHS,
  },
  entry: {
    index: `${PATHS.src}/index.js`,
    users: `${PATHS.src}/users.js`,
    user: `${PATHS.src}/user.js`,
    signin: `${PATHS.src}/signin.js`,
    editAvatar: `${PATHS.src}/edit-avatar.js`,
    signup: `${PATHS.src}/signup.js`
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  node: {
    __dirname: false,
  },
  target: 'web',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node-modules/'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name:'[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true, config: {path: './postcss.config.js'}}
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true}
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        FormData: 'form-data'
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/${PATHS.assets}images`, to: `${PATHS.assets}images`},
      {from: `${PATHS.src}/pug/`, to: `${PATHS.dist}/views/`, ignore: ['head.pug', 'script.pug']},
      {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
      {from: `${PATHS.src}/static`, to: ''}
    ]),
  ],
}

module.exports = base;
