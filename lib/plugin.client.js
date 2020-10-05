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

module.exports = (_) => {
  onLoad(() => {
    const snipcartVersion = '<%= options.snipcartVersion %>'
    const key = '<%= options.snipcartKey %>'

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

    const snipcartJS = document.createElement('script')
    snipcartJS.src = `https://cdn.snipcart.com/themes/${snipcartVersion}/default/snipcart.js`

    document.body.appendChild(snipcartHTML)
    document.body.appendChild(snipcartJS)
  })
}
