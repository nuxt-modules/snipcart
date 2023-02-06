# @nuxtjs/snipcart

[![npm version](https://badge.fury.io/js/@nuxtjs%2Fsnipcart.svg)](https://badge.fury.io/js/@nuxtjs%2Fsnipcart)
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[&nbsp;Release Notes](/CHANGELOG.md)

## [If you like using this module please consider sponsoring](https://github.com/sponsors/flozero)

## If you are looking for nuxt 2 version please use [1.x version](https://github.com/nuxt-community/snipcart-module/blob/master/README.md)

## Features

- Full typescript support base on [snipcart interface documentation](https://docs.snipcart.com/v3/sdk/reference)
- Full support of snipcart documentation out of the box
- highly customization with power of nuxt3

## Quick Setup

1. Add `@nuxtjs/snipcart` dependency to your project

```bash
# Using pnpm
pnpm add -D @nuxtjs/snipcart

# Using yarn
yarn add --dev @nuxtjs/snipcart

# Using npm
npm install --save-dev @nuxtjs/snipcart
```

2. Add `@nuxtjs/snipcart` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/snipcart'
  ],
  snipcart: {
    publicApiKey: "youkey"
  }
})
```

That's it! You can now use `Snipcart` in your Nuxt app ✨

At any time please have a look at our beautiful playground example.


## useSnipcart

We tried to not create too much wrapper around the Snipcart api so we don't have to maintain so much if Snipcart change. But you may found some of them useful as:
- exposing snipcart instance
- use of isReady boolean to watch and make sure you can use snipcart instance safely
- realtime store subscription (working but performance hit) 
- some function in case you are not using the JS SDK form `window.Snipcart` that will help you add html attributes that Snipcart will read on load. As bindProductItem or bindProductItemCustom
- ability to change language or currency using respectively `setLanguage` or `setCurrency`

As we have a full typescript support play with it and read the description of what is exposed.

## Loading

We are following Snipcart [different loadings](https://docs.snipcart.com/v3/setup/installation). You can control the load of the js using `loadStrategy` configuration property. You can tell snipcart to not load css using `loadCSS` config property.

If you load async take in consideration on server or client you will not have access to `window.Snipcart` or `snipcart` exposed by `useSnipcart` until its loaded. So adapt your logic

## [Customization](https://docs.snipcart.com/v3/setup/customization)

With nuxt it is super easy to customize snipart components. Use your own class css in addition of custom html to override [snipcart component](https://docs.snipcart.com/v3/themes/default/reference).

To do that create for example `public/snipcart-custom.html` as inside the playground. And make sure you add the path in the nuxt config using `templatesUrl` property

## [Snipcart SDK](https://docs.snipcart.com/v3/sdk/basics)

As we told before we expose the snipcart SDK as by default with window.Snipcart or form the composable `useSnipcart`. So you will have the exact same full access to snipcart SDK

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/snipcart/next.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/snipcart

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/snipcart

[license-src]: https://img.shields.io/npm/l/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/snipcart
