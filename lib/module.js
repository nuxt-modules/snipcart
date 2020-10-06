const path = require('path')

module.exports = function (moduleOptions) {
  const defaultOptions = {
    snipcartVersion: 'v3.0.22',
    addProductBehavior: true
  }
  // data - config - add - product - behavior = "none";
  const options = {
    ...defaultOptions,
    ...(this.options.snipcart || {}),
    ...(moduleOptions || {})
  }

  this.options.head.link.push(
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: `https://cdn.snipcart.com/themes/${options.snipcartVersion || 'v3.0.22'}/default/snipcart.css`
    }
  )

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  })
}

exports.meta = require('../package.json')
