# @nuxtjs/snipcart

![npm version](https://img.shields.io/npm/v/@nuxtjs/snipcart?style=flat-square)
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
npx nuxi@latest module add snipcart
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
- isReady will define the basic settings are ready to be used but snipcart not loaded yet
- use watch on snipcart to make sure its ready
- realtime store subscription
- utils functions As bindProductItem or bindProductItemCustom
- wrapper utils function to change language or currency using respectively `setLanguage` or `setCurrency`

As we have a full typescript support play with it and read the description of what is exposed.

## Loading

We are following Snipcart [different loadings](https://docs.snipcart.com/v3/setup/installation). You can control the load of the js using `loadStrategy` configuration property. You can tell snipcart to not load css using `loadCSS` config property.

If you load async take in consideration you will not have access to `window.Snipcart` or `snipcart` exposed by `useSnipcart` until its loaded. So adapt your logic. Check on playground we have added few comments

## [Customization](https://docs.snipcart.com/v3/setup/customization)

With nuxt it is super easy to customize snipart components. Use your own class css in addition of custom html to override [snipcart component](https://docs.snipcart.com/v3/themes/default/reference).

To do that create for example `public/snipcart-custom.html` as inside the playground. And make sure you add the path in the nuxt config using `templatesUrl` property

```
 snipcart: {
    templatesUrl: '/snipcart-custom.html',
```

this will after be passed to snipcart to understand what file to retrieve to have access to all templates it will use to build snipcart components


## [Snipcart SDK](https://docs.snipcart.com/v3/sdk/basics)

As we told before we expose the snipcart SDK as by default with window.Snipcart or form the composable `useSnipcart`. So you will have the exact same full access to snipcart SDK

## Development

```bash
# Install dependencies
pnpm install

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Release new version
pnpm release
```
<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/snipcart/next.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/snipcart

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/snipcart

[license-src]: https://img.shields.io/npm/l/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/snipcart
