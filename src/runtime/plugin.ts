import type { ModuleOptions } from '../module'
import { useSnipcart } from './composables/useSnipcart'
import { defineNuxtPlugin } from '#app'

/**
 * @description this code is coming from snipcart https://docs.snipcart.com/v3/setup/installation
 * if you want a readable version of this code check _readable.md file in the repo. I am not using the readble version
 * cause it will be fast to maintain like this instead of taking the risks to miss interpret the code
 */
/* eslint-disable-next-line */
const LoadSnipcart = () => function () { var c, d; (d = (c = window.SnipcartSettings).version) != null || (c.version = '3.0'); var s, S; (S = (s = window.SnipcartSettings).timeoutDuration) != null || (s.timeoutDuration = 2750); var l, p; (p = (l = window.SnipcartSettings).domain) != null || (l.domain = 'cdn.snipcart.com'); var w, u; (u = (w = window.SnipcartSettings).protocol) != null || (w.protocol = 'https'); var m, g; (g = (m = window.SnipcartSettings).loadCSS) != null || (m.loadCSS = !0); const y = window.SnipcartSettings.version.includes('v3.0.0-ci') || window.SnipcartSettings.version != '3.0' && window.SnipcartSettings.version.localeCompare('3.4.0', void 0, { numeric: !0, sensitivity: 'base' }) === -1, f = ['focus', 'mouseover', 'touchmove', 'scroll', 'keydown']; window.LoadSnipcart = o; document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r(); function r() { window.SnipcartSettings.loadStrategy ? window.SnipcartSettings.loadStrategy === 'on-user-interaction' && (f.forEach(function (t) { return document.addEventListener(t, o) }), setTimeout(o, window.SnipcartSettings.timeoutDuration)) : o() } var a = !1; function o() { if (a) return; a = !0; var t = document.getElementsByTagName('head')[0], n = document.querySelector('#snipcart'), i = document.querySelector('src[src^="'.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '"][src$="snipcart.js"]')), e = document.querySelector('link[href^="'.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '"][href$="snipcart.css"]')); n || (n = document.createElement('div'), n.id = 'snipcart', n.setAttribute('hidden', 'true'), document.body.appendChild(n)), h(n), i || (i = document.createElement('script'), i.src = ''.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '/themes/v').concat(window.SnipcartSettings.version, '/default/snipcart.js'), i.async = !0, t.appendChild(i)), !e && window.SnipcartSettings.loadCSS && (e = document.createElement('link'), e.rel = 'stylesheet', e.type = 'text/css', e.href = ''.concat(window.SnipcartSettings.protocol, '://').concat(window.SnipcartSettings.domain, '/themes/v').concat(window.SnipcartSettings.version, '/default/snipcart.css'), t.prepend(e)), f.forEach(function (v) { return document.removeEventListener(v, o) }) } function h(t) { !y || (t.dataset.apiKey = window.SnipcartSettings.publicApiKey, window.SnipcartSettings.addProductBehavior && (t.dataset.configAddProductBehavior = window.SnipcartSettings.addProductBehavior), window.SnipcartSettings.modalStyle && (t.dataset.configModalStyle = window.SnipcartSettings.modalStyle), window.SnipcartSettings.currency && (t.dataset.currency = window.SnipcartSettings.currency), window.SnipcartSettings.templatesUrl && (t.dataset.templatesUrl = window.SnipcartSettings.templatesUrl)) } }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    window.SnipcartSettings = nuxtApp.$config.public.snipcart as ModuleOptions

    if (!import.meta.server) {
      document.addEventListener('snipcart.ready', () => {
        const { snipcart, isReady } = useSnipcart()
        snipcart.value = window.Snipcart

        const { language, translations } = window.SnipcartSettings

        snipcart.value.api.session.setLanguage(language, translations ? translations[language] : {})
        isReady.value = true
      })

      LoadSnipcart()()
    }
  })
})
