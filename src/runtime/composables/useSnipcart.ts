import { useNuxtApp, useState } from "#imports"
import { watch } from "vue"
import defu from "defu"

import type { SnipcartSDK } from "../../types"
import type { ModuleOptions } from "../../module"

interface Map {
  [key: string]: string
}

// /**
//  * @description this code is coming from snipcart https://docs.snipcart.com/v3/setup/installation
//  * if you want a readable version of this code check _readable.md file in the repo. I am not using the readble version
//  * cause it will be fast to maintain like this instead of taking the risks to miss interpret the code
//  */
// /* eslint-disable-next-line */
const LoadSnipcart = () => function () { var c, d; (d = (c = window.SnipcartSettings).version) != null || (c.version = '3.0'); var s, S; (S = (s = window.SnipcartSettings).timeoutDuration) != null || (s.timeoutDuration = 2750); var l, p; (p = (l = window.SnipcartSettings).domain) != null || (l.domain = 'cdn.snipcart.com'); var w, u; (u = (w = window.SnipcartSettings).protocol) != null || (w.protocol = 'https'); var m, g; (g = (m = window.SnipcartSettings).loadCSS) != null || (m.loadCSS = !0); const y = window.SnipcartSettings.version.includes('v3.0.0-ci') || window.SnipcartSettings.version != '3.0' && window.SnipcartSettings.version.localeCompare('3.4.0', void 0, { numeric: !0, sensitivity: 'base' }) === -1, f = ['focus', 'mouseover', 'touchmove', 'scroll', 'keydown']; window.LoadSnipcart = o; document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r(); function r() { window.SnipcartSettings.loadStrategy ? window.SnipcartSettings.loadStrategy === 'on-user-interaction' && (f.forEach(function (t) { return document.addEventListener(t, o) }), setTimeout(o, window.SnipcartSettings.timeoutDuration)) : o() } var a = !1; function o() { if (a) return; a = !0; var t = document.getElementsByTagName('head')[0], n = document.querySelector('#snipcart'), i = document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '"][src$="snipcart.js"]')), e = document.querySelector('link[href^="'.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '"][href$="snipcart.css"]')); n || (n = document.createElement('div'), n.id = 'snipcart', n.setAttribute('hidden', 'true'), document.body.appendChild(n)), h(n), i || (i = document.createElement('script'), i.src = ''.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '/themes/v').concat(window.SnipcartSettings.version, '/default/snipcart.js'), i.async = !0, t.appendChild(i)), !e && window.SnipcartSettings.loadCSS && (e = document.createElement('link'), e.rel = 'stylesheet', e.type = 'text/css', e.href = ''.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '/themes/v').concat(window.SnipcartSettings.version, '/default/snipcart.css'), t.prepend(e)), f.forEach(function (v) { return document.removeEventListener(v, o) }) } function h(t) { !y || (t.dataset.apiKey = window.SnipcartSettings.publicApiKey, window.SnipcartSettings.addProductBehavior && (t.dataset.configAddProductBehavior = window.SnipcartSettings.addProductBehavior), window.SnipcartSettings.modalStyle && (t.dataset.configModalStyle = window.SnipcartSettings.modalStyle), window.SnipcartSettings.currency && (t.dataset.currency = window.SnipcartSettings.currency), window.SnipcartSettings.templatesUrl && (t.dataset.templatesUrl = window.SnipcartSettings.templatesUrl)) } }


export const useSnipcart = () => {
    /**
     * @description the actual snipcart install
     */
    const snipcart = useState<SnipcartSDK | null>('snipcart', () => null)
    /**
     * @description  you can watch to this boolean if you want to be sure snipcart is available
     */
    const isReady = useState(() => false)
    /**
     * @description This can cause performance hit. It's working but receive multiple events on changes. Not sure why
     */
    const store = useState("store", () => null)
    /**
     * @description if you are using subscription settings in your snipcart. You can manually unsubscribe using this
     */
    const offStore = useState<() => void>("offStore", () => null)
    const nuxtApp = useNuxtApp()

    /**
     *
     * @param bindProductItemCustom  an Object of key value that will represent your product custom fields.
     * @returns Object data-item-custom* that you will be able to bind into html element
     */
    const bindProductItemCustom = (bindProductItemCustom: any) => {
        const fields : Map = {}

        bindProductItemCustom.forEach((field : any, index: string) => {
            if (typeof field !== 'object') {
                throw new TypeError('each bindProductItemCustom field should be an object')
            }
            Object.keys(field).forEach((key) => {
                const fieldKey = `data-item-custom${index + 1}-${key.toString().toLowerCase()}`
                fields[fieldKey] = field[key]
            })
        })
        return fields
    }

    /**
     *
     * @param product an Object of key value that will represent your product.
     * @returns Object data-item-* that you will be able to bind into html element
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bindProductItem = (product: any) => {
      const fields: Map = {}

      if (typeof product !== 'object') {
        throw new TypeError('Product should be an object')
      }

      Object.keys(product).forEach((key) => {
        fields[`data-item-${key.toString().toLowerCase()}`] = product[key]
      })
      return fields
    }

    /**
     *
     * @param currency the current to switch on
     * @returns void
     */
    const setCurrency = async (currency: string) => {
      if (!snipcart.value) return console.error('setCurrency - snipcart is not yet ready')
      snipcart.value.api.session.setCurrency(currency)
    }

    /**
     *
     * @param lang the lang you want to switch
     * @param _translations the override translations you want to send at runtime. This will override the translations given during the init
     * @returns void
     */
    const setLanguage = async (lang: string, _translations = {}) => {
      if (!snipcart.value) return console.error('setLanguage - snipcart is not ready')

      const { translations } = nuxtApp.$config.public.snipcart
      const finalTranslations = {
        ...(translations ? translations[lang] : {}),
        ..._translations,
      }
      snipcart.value.api.session.setLanguage(lang, finalTranslations)
    }

    /**
     * @description use it to manually load snipcart
     */
    const loadSnipcart = () => {
      if (import.meta.server) throw ('can\'t load snipcart on server side')
      window.LoadSnipcart()
    }


    nuxtApp.hook('app:mounted', () => {
      const nuxtApp = useNuxtApp()

      if (!snipcart.value) {
        window.SnipcartSettings = nuxtApp.$config.public.snipcart as ModuleOptions

        if (nuxtApp.$config.public.snipcart.loadStrategy !== "manual") LoadSnipcart()()

        document.addEventListener('snipcart.ready', () => {
          snipcart.value = window.Snipcart
          const { language, translations } = window.SnipcartSettings

          snipcart.value.api.session.setLanguage(language, translations ? translations[language] : {})

          if (window.SnipcartSettings.subscription) {
            offStore.value = window.Snipcart.store.subscribe(() => {
              const currentValue = window.Snipcart.store.getState()
              const oldStore = defu(store.value)
              if (oldStore != currentValue) {
                store.value = currentValue
              }
            })
          }
        })
      }
      isReady.value = true
    })

  return {
    bindProductItem,
    bindProductItemCustom,
    setCurrency,
    setLanguage,
    snipcart,
    isReady,
    store,
    offStore,
    loadSnipcart
  }
}
