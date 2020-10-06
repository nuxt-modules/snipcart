import consola from 'consola'
const logger = consola.withScope('nuxt:snipcart')

export const onLoad = (callback, delay = 1) => {
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}

export const customFields = (customFields) => {
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
