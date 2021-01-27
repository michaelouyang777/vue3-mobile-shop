'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const timestamp = new Date().getTime()
const isNotDevelopment = process.env.NODE_ENV !== 'dev'
const defaultSettings = require('./src/config/setting.ts')

module.exports = {
  outputDir: process.env.NODE_ENV,
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack(config) {
    config.name = defaultSettings.title
    config.output.filename = `js/[name].[hash].${timestamp}.js`
    config.output.chunkFilename = `js/[name].[hash].${timestamp}.js`
  },
  chainWebpack(config) {
    config.resolve.alias.set('@', resolve('src'))

    // set svg-sprite-loader
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
      // shutdown preload
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
  }
}