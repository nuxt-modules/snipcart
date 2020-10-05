const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [{ handler: require('../') }],
  snipcart: {
    snipcart_key: 'asdad'
  }
}
