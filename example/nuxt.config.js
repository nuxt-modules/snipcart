import { resolve, join } from 'path'
import myModule from '../'

export default {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [{ handler: myModule }],
  snipcart: {
    key: process.env.key,
    snipcartCustomize: join(__dirname, './snipcart/customize'),
    locales: {
      fr: {
        cart_summary: {
          total: 'Total fr'
        }
      },
      en: {
        cart_summary: {
          total: 'Total en'
        }
      }
    },
    attributes: [
      ['data-config-modal-style', 'side']
    // ['data-config-add-product-behavior', 'none']
    ]
  },
  css: ['~/snipcart/customize.css']
}
