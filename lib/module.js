const path = require('path')

const configValidation = (options) => {
  if (options.snipcartCustomize.length && !path.isAbsolute(options.snipcartCustomize)) {
    throw new Error('snipcartCustomize should be absolute')
  }

  if (!options.key) {
    throw new Error('no snipcart key defined')
  }
}

const stringifyOptions = (options) => {
  // sanitize object as handlebars handle very badly objects
  options.locales = JSON.stringify(options.locales)
  if (options.snipcartCustomize) { options.snipcartCustomize = JSON.stringify(require(options.snipcartCustomize)) }

  // all attributes you will add will be use
  options.attributes = JSON.stringify(
    [
      ['data-api-key', options.key],
      ...options.attributes
    ]
  )
}

const mergeDefaultOptions = (moduleOptions, options) => {
  const defaultOptions = {
    version: 'v3.0',
    snipcartCustomize: '',
    locales: {},
    attributes: []
  }

  return {
    ...defaultOptions,
    ...(options.snipcart || {}),
    ...(moduleOptions || {})
  }
}

module.exports = function (moduleOptions) {
  const options = mergeDefaultOptions(moduleOptions, this.options)
  configValidation(options)

  // watch for changes to facilitate development
  this.options.build.watch = [
    ...(this.options.build.watch || []),
    options.snipcartCustomize ? options.snipcartCustomize : '',
    path.resolve(__dirname, '.')
  ]

  stringifyOptions(options)

  // default header
  this.options.head.link.push(
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: `https://cdn.snipcart.com/themes/${options.version}/default/snipcart.css`
    }
  )

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}

exports.meta = require('../package.json')
