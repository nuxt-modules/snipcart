import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'

interface ModuleOptionsPrivate {
  LoadSnipcart?: Function
  isBeforeV3_4?: boolean
  isLoaded?: boolean
  events? : string[]
}

export interface ModuleOptions extends ModuleOptionsPrivate {
  version: string
  publicApiKey: string
  timeoutDuration: number
  domain: string
  protocol: string
  loadCSS: boolean
  loadStrategy: "" | "on-user-interaction" | "manual"
  addProductBehavior: "" | "none"
  modalStyle: "" | "side",
  language: string,
  templatesUrl: string,
  currency: string
}

declare global {
  interface Window { 
    SnipcartSettings: ModuleOptions
    // TODO: ask for the type definition from snipcart here
    Snipcart: any
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/snipcart',
    configKey: 'snipcart',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    version: '3.0',
    publicApiKey: "",
    timeoutDuration: 2750,
    domain: "cdn.snipcart.com",
    protocol: "https",
    loadCSS: true,
    loadStrategy: "",
    addProductBehavior: "",
    modalStyle: "",
    language: "en",
    templatesUrl: "",
    currency: "us"
  },
  async setup(options, nuxt) {

    if (!options.publicApiKey.length) {
      throw new Error("publicApiKey cant be null")
    }

    nuxt.options.runtimeConfig.public.snipcart = options

    const resolver = createResolver(import.meta.url)
    
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  }
})
