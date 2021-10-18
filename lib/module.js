const path = require('path')
const fs = require('fs')

const configValidation = (options) => {
  if (options.snipcartCustomize.length && !path.isAbsolute(options.snipcartCustomize)) {
    throw new Error('snipcartCustomize should be absolute')
  }

  if (!options.key) {
    throw new Error('no snipcart key defined')
  }
}

const stringifyOptions = (options) => {
  options.locales = JSON.stringify(options.locales)

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
    path: {
      base: path.join(options.srcDir, 'snipcart'),
      js: path.join(options.srcDir, 'snipcart', 'customize.js'),
      css: path.join(options.srcDir, 'snipcart', 'customize.css')
    },
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

  if (fs.existsSync(options.path.js)) {
    this.options.watch = [
      ...(this.options.watch || []),
      options.path.js
    ]

    options.snipcartCustomize = JSON.stringify(require(options.path.js))
  }

  if (fs.existsSync(options.path.css)) {
    this.options.watch = [
      ...(this.options.watch || []),
      options.path.css
    ]
  }

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

  let str = JSON.stringify(options.locales)
  str = str.replace(/'/g, "\\\\'")
  options.locales = JSON.parse(str)

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}

exports.meta = require('../package.json')
