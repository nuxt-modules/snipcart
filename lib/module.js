const path = require('path')

module.exports = function (moduleOptions) {
  const defaultOptions = {
    version: 'v3.0.23',
    addProductBehavior: true,
    snipcartCustomize: '',
    locales: {}
  }

  const options = {
    ...defaultOptions,
    ...(this.options.snipcart || {}),
    ...(moduleOptions || {})
  }

  if (options.snipcartCustomize.length && !path.isAbsolute(options.snipcartCustomize)) {
    throw new Error('snipcartCustomize should be absolute')
  }

  if (!options.key) {
    throw new Error('no snipcart key defined')
  }

  if (options.snipcartCustomize.length) {
    this.options.watch = [
      ...(this.options.watch || []),
      options.snipcartCustomize
    ]
  }

  // sanitize object as handlebars handle very badly objects
  options.locales = JSON.stringify(options.locales)
  if (options.snipcartCustomize) { options.snipcartCustomize = JSON.stringify(require(options.snipcartCustomize)) }

  this.options.head.link.push(
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: `https://cdn.snipcart.com/themes/${options.version || 'v3.0.23'}/default/snipcart.css`
    }
  )

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}

exports.meta = require('../package.json')
