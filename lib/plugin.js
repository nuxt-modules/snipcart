import consola from 'consola'
const logger = consola.withScope('nuxt:snipcart')

const onLoad = (callback, delay = 1) => {
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}

const customFields = (customFields) => {
  const ret = {}

  customFields.forEach((field, index) => {
    if (typeof field !== 'object') {
      logger.error('error with your field should be an object', field)
    }
    Object.keys(field).forEach((key) => {
      ret[`data-item-custom${index + 1}-${key.toString().toLowerCase()}`] =
        field[key]
    })
  })
  return ret
}

const initEvents = (locales) => {
  document.addEventListener('snipcart.ready', function () {
    Object.keys(locales).forEach((locale) => {
      window.Snipcart.api.session.setLanguage(locale, locales[locale])
    })
  })
}

const setLanguage = (lang, options) => {
  if (typeof window !== 'undefined' && window.Snipcart) {
    window.Snipcart.api.session.setLanguage(lang, options)
  } else {
    logger.error('window Snipcart not accessible')
  }
}

const injectSnipcartHTML = (addProductBehavior, key) => {
  const snipcartHTML = document.createElement('div')
  snipcartHTML.hidden = true
  snipcartHTML.id = 'snipcart'
  snipcartHTML.setAttribute('data-api-key', key)

  snipcartHTML.innerHTML = '<%= options.snipcartCustomize %>'

  if (addProductBehavior === 'false') {
    snipcartHTML.setAttribute('data-config-add-product-behavior', 'none')
  }

  document.body.appendChild(snipcartHTML)
}

const injectSnipcartJS = (snipcartVersion) => {
  const snipcartJS = document.createElement('script')
  snipcartJS.src = `https://cdn.snipcart.com/themes/${snipcartVersion}/default/snipcart.js`

  document.body.appendChild(snipcartJS)
}

export default (_, inject) => {
  inject('snipcart', {
    customfields: customFields,
    setLanguage
  })

  // not execute the second part on sever
  if (process.server) { return }

  onLoad(() => {
    const snipcartVersion = '<%= options.snipcartVersion %>'
    const key = '<%= options.snipcartKey %>'
    const addProductBehavior = '<%= options.addProductBehavior %>'
    const locales = JSON.parse('<%= options.locales %>')

    initEvents(locales)
    injectSnipcartHTML(addProductBehavior, key)
    injectSnipcartJS(snipcartVersion)
  })
}
