const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [{ handler: require('../') }],
  snipcart: {
    snipcartKey: process.env.snipcartKey
    // addProductBehavior: false,
  }
}
