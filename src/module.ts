import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'url'
import defu from 'defu'

import type { SnipcartSDK } from './types'

export interface ModuleOptions {
  version: string
  publicApiKey: string
  timeoutDuration: number
  domain: string
  protocol: string
  loadCSS: boolean
  loadStrategy: '' | 'on-user-interaction' | 'manual'
  addProductBehavior: '' | 'none'
  modalStyle: '' | 'side'
  language: string
  templatesUrl: string
  currency: string
  subscription: boolean
  translations: any
}

declare global {
  interface Window {
    SnipcartSettings: ModuleOptions
    Snipcart: SnipcartSDK
    LoadSnipcart: () => any
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/snipcart',
    configKey: 'snipcart',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    version: '3.0',
    publicApiKey: '',
    timeoutDuration: 2750,
    domain: 'cdn.snipcart.com',
    protocol: 'https',
    loadCSS: true,
    loadStrategy: '',
    addProductBehavior: '',
    modalStyle: '',
    language: 'en',
    templatesUrl: '',
    currency: 'usd',
    subscription: false,
    translations: {},
  },
  async setup(options, nuxt) {
    if (!options.publicApiKey.length) {
      throw new Error('publicApiKey cant be null')
    }

    nuxt.options.runtimeConfig.public.snipcart = options

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
    })
  },
})
