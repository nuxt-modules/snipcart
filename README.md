# @nuxtjs/snipcart

<!-- [![npm version][npm-version-src]][npm-version-href] -->
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Snipcart](https://docs.snipcart.com/v3/setup/installation) integration with for [NuxtJS](https://nuxtjs.org)



## Features

- init snipcart properly
- Specify the version you want to use
- Disable product behavior on demand

[📖 &nbsp;Read more](https://nuxt-snipcart.netlify.app/)

## Quick Setup

1. Add `@nuxtjs/snipcart` dependency to your project

```bash
# using yarn
yarn add @nuxtjs/snipcart 

# using npm
npm install @nuxtjs/snipcart
```

2. Add `@nuxtjs/snipcart` to the `buildModules` section of `nuxt.config.js`

```js[nuxt.config.js]
{
  modules: [
    // Simple usage
    '@nuxtjs/snipcart',

    // With options
    ['@nuxtjs/snipcart', { /* module options */ }]
  ]
}
```

Or a separate section `snipcart` for module options:

```js[nuxt.config.js]
{
  modules: [
    // Simple usage
    '@nuxtjs/snipcart',
  ],
  snipcart: {
    snipcartKey: '<your-snipcart-key>',
    /* all other options */
  }
}
```

See [module options](https://nuxt-snipcart.netlify.app/setup).

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c)

Maintained by [Florent Giraud](https://github.com/f3ltron)

<!-- Badges -->
<!-- [npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/snipcart/latest.svg -->
<!-- [npm-version-href]: https://npmjs.com/package/@nuxtjs/snipcart -->

<!-- [npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/snipcart.svg -->
<!-- [npm-downloads-href]: https://npmjs.com/package/@nuxtjs/snipcart -->

<!-- [github-actions-ci-src]: https://github.com/nuxt-community/snipcart-module/workflows/ci/badge.svg -->
<!-- [github-actions-ci-href]: https://github.com/nuxt-community/snipcart-module/actions?query=workflow%3Aci -->

<!-- [codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/snipcart-module.svg -->
<!-- [codecov-href]: https://codecov.io/gh/nuxt-community/snipcart-module -->

<!-- [license-src]: https://img.shields.io/npm/l/@nuxtjs/snipcart.svg -->
<!-- [license-href]: https://npmjs.com/package/@nuxtjs/snipcart -->

## TODO

Add data-config-add-product-behavior functionnality
Publish to npm
