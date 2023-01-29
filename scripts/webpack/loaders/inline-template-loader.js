const loaderUtils = require('loader-utils')
const pug = require('pug')
const dedent = require('dedent')

module.exports = function (source) {
  this.cacheable()
  const options = loaderUtils.getOptions(this)
  const regex = /pug`([^`]+)`/

  let rv = source
  let matches = regex.exec(rv)

  while (matches) {
    const template = pug.compile(dedent(matches[1]).trimRight(), options)

    const html = `\`${template()}\``

    rv = rv.replace(regex, html)
    matches = regex.exec(rv)
  }

  return rv
}
