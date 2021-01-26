const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const Timestamp = new Date().getTime()
const isNotDevelopment = process.env.NODE_ENV !== 'dev'

module.exports = {
  outputDir: process.env.NODE_ENV,
  publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // isNotDevelopment
    if (isNotDevelopment) {
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        chunks: 'all'
      })
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options =>
          Object.assign(options, {
            limit: 6144,
            esModule: false
          })
        )
      config.plugin('progressBarPlugin').use(new ProgressBarPlugin())
    }
  },
  configureWebpack: config => {
    config.output.filename = `js/[name].[hash].${Timestamp}.js`
    config.output.chunkFilename = `js/[name].[hash].${Timestamp}.js`
  }
}