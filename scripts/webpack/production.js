const ClosurePlugin = require('closure-webpack-plugin')

module.exports = (env, argv) => ({
  mode: 'production',
  optimization: {
    minimizer: [
      new ClosurePlugin({ mode: 'STANDARD' }, {
        // compiler flags here
        //
        // for debuging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true,
        // renaming: false
      })
    ]
  }
})
