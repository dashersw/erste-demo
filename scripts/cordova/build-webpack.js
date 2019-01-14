/* eslint-disable no-console */

const webpack = require('webpack')
const { promisify } = require('util')
const webpackConfig = require('../../webpack.config')

module.exports = async function(ctx) {
  const stats = await promisify(webpack)(webpackConfig({
    production: true,
    cordova: true
  }))

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  console.log(stats.toString({ colors: true }))
}
