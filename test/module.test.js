const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await setup(loadConfig(__dirname, '../../example')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain(
      '<link data-n-head="ssr" rel="preconnect" href="https://app.snipcart.com">' +
      '<link data-n-head="ssr" rel="preconnect" href="https://cdn.snipcart.com">' +
      '<link data-n-head="ssr" rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.22/default/snipcart.css">' +
      '<script data-n-head="ssr" src="https://cdn.snipcart.com/themes/v3.0.22/default/snipcart.js" async></script>'
    )
  })
})
