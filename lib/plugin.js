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
      throw new TypeError('each customFields field should be an object')
    }
    Object.keys(field).forEach((key) => {
      ret[`data-item-custom${index + 1}-${key.toString().toLowerCase()}`] =
        field[key]
    })
  })
  return ret
}

const initEvents = () => {
  const locales = JSON.parse('<%= options.locales %>')

  document.addEventListener('snipcart.ready', function () {
    Object.keys(locales).forEach((locale) => {
      window.Snipcart.api.session.setLanguage(locale, locales[locale])
    })
  })
}

const setLanguage = (lang, options) => {
  if (typeof window === 'undefined' || !window.Snipcart) {
    throw new Error('window.Snipcart not accessible')
  }
  window.Snipcart.api.session.setLanguage(lang, options)
}

const bindProduct = (product) => {
  const ret = {}

  if (typeof product !== 'object') {
    throw new TypeError('Product should be an object')
  }

  Object.keys(product).forEach((key) => {
    ret[`data-item-${key.toString().toLowerCase()}`] =
    product[key]
  })
  return ret
}

const injectSnipcartHTML = () => {
  const snipcartHTML = document.createElement('div')
  snipcartHTML.hidden = true
  snipcartHTML.id = 'snipcart'

  const attributes = JSON.parse('<%= options.attributes %>')
  attributes.forEach((attr) => {
    if (!attr.length || attr.length !== 2) {
      // eslint-disable-next-line no-console
      console.error(`attributes ${attr} should be and array of lenght of 2`)
    } else {
      snipcartHTML.setAttribute(attr[0], attr[1])
    }
  })

  snipcartHTML.innerHTML = '<%= options.snipcartCustomize %>'
  document.body.appendChild(snipcartHTML)
}

const injectSnipcartJS = () => {
  const version = '<%= options.version %>'

  const snipcartJS = document.createElement('script')
  snipcartJS.src = `https://cdn.snipcart.com/themes/${version}/default/snipcart.js`

  document.body.appendChild(snipcartJS)
}

export default (_, inject) => {
  const snipcart = {
    customfields: customFields,
    setLanguage,
    bindProduct
  }

  inject('snipcart', snipcart)

  // not execute the second part on sever
  if (process.server) { return }

  onLoad(() => {
    initEvents()
    injectSnipcartHTML()
    injectSnipcartJS()
  })
}
