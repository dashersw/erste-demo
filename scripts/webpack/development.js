const path = require('path')

module.exports = (env, argv) => ({
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../../www'),
    port: 9000
  }
})
