import { resolve, join } from 'path'
import myModule from '../'

export default {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  buildModules: [{ handler: myModule }],
  snipcart: {
    snipcartKey: process.env.SNIPCARTKEY,
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
    }
    // addProductBehavior: false,
  },
  css: ['~/snipcart/customize.css']
}
