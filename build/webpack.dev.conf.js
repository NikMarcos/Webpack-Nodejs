const webpackDev = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const PAGES_DIR = `${baseWebpackConfig.externals.paths.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist/views/pages/', //baseWebpackConfig.externals.paths.dist`,
    overlay: true,
    // hot: true,
    // inline: true,
    // disableHostCheck: true,
    // historyApiFallback: true
  },
  plugins: [
    new webpackDev.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `${page.replace(/\.pug/,'.html')}`,
      msg: `${page.replace(/\.pug/,'')}`,
      msg2: HtmlWebpackPlugin.files,
      inject: false,
    })),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
