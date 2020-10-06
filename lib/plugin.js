const consola = require('consola')
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

const customfields = (customFields) => {
  const ret = {}

  customFields.forEach((field, index) => {
    if (typeof field !== 'object') {
      logger.error('error with your field should be an object', field)
    }
    Object.keys(field).forEach((key) => {
      ret[`data-item-custom${index + 1}-${key.toString().toLowerCase()}`] = field[key]
    })
  })
  return ret
}

module.exports = (_, inject) => {
  inject('snipcart',
    {
      customfields
    }
  )

  if (process.server) { return }

  onLoad(() => {
    const snipcartVersion = '<%= options.snipcartVersion %>'
    const key = '<%= options.snipcartKey %>'
    const addProductBehavior = '<%= options.addProductBehavior %>'

    if (!key) {
      logger.error(
        'You need to provide a snipcartKey. See 👉 https://app.snipcart.com/dashboard/account/credentials to get it.'
      )
      throw new Error('no snipcart key defined')
    }

    const snipcartHTML = document.createElement('div')
    snipcartHTML.hidden = true
    snipcartHTML.id = 'snipcart'
    snipcartHTML.setAttribute('data-api-key', key)

    if (addProductBehavior === 'false') {
      snipcartHTML.setAttribute('data-config-add-product-behavior', 'none')
    }

    const snipcartJS = document.createElement('script')
    snipcartJS.src = `https://cdn.snipcart.com/themes/${snipcartVersion}/default/snipcart.js`

    document.body.appendChild(snipcartHTML)
    document.body.appendChild(snipcartJS)
  })
}
