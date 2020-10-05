const logger = require('./utilities/logger')

export default function (moduleOptions) {
  const options = {
    ...(this.options.snipcart || {}),
    ...(moduleOptions || {})
  }

  const snipcartVersion = options.snipcart_version || 'v3.0.22'

  if (!options.snipcart_key) {
    logger.error(
      'You need to provide a snipcart_key. See 👉 https://app.snipcart.com/dashboard/account/credentials to get it.'
    )
    throw new Error('no snipcart key defined')
  }

  this.options.head.script.push({
    innerHTML: `
      document.addEventListener('DOMContentLoaded', function() {
        const snipcartHTML = document.createElement('div')
        snipcartHTML.hidden = true
        snipcartHTML.id = 'snipcart'
        snipcartHTML.setAttribute('data-api-key', ${JSON.stringify(
          options.snipcart_key
        )})
        document.body.appendChild(snipcartHTML)
      })
    `,
    type: 'text/javascript',
    charset: 'utf-8'
  })

  // we need to define this to let the script be executed
  this.options.head.__dangerouslyDisableSanitizers = ['script']

  this.options.head.script.push({
    src: `https://cdn.snipcart.com/themes/${snipcartVersion}/default/snipcart.js`,
    async: true
  })

  this.options.head.link.push(
    { rel: 'preconnect', href: 'https://app.snipcart.com' },
    { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
    {
      rel: 'stylesheet',
      href: `https://cdn.snipcart.com/themes/${snipcartVersion}/default/snipcart.css`
    }
  )
}

exports.meta = require('../package.json')
