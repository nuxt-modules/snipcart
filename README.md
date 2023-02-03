# @nuxtjs/snipcart

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> Snipcart Module

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- [![@nuxtjs/color-mode](https://snipcart.nuxtjs.org/preview.png)](https://snipcart.nuxtjs.org) -->

## WARNING this is still under development API will probably have breaking change

TODO:
- [x] publish beta version
- [] Update process to align with new Nuxt module
- [] Evaluate and make sure we have a migration doc
- [] Check how far we can have backward compatibility
- [] Improve Examples
- [] Add testing cypress or playwright
- [] Contact Snipcart for typing for Snipcart main
- [] Current Module typing is correct but need improvement on the "private" properties

## Features

- ⛰ Init Snipcart automatically, lazily, and manually
- 🚠 Easy customization
- 🌲 Use Snipcart and internationalization
- ⛰ Customize the Snipcart checkout experience easily

## Quick Setup

1. Add `@nuxtjs/snipcart@beta` dependency to your project

```bash
# Using pnpm
pnpm add -D @nuxtjs/snipcart@beta

# Using yarn
yarn add --dev @nuxtjs/snipcart@beta

# Using npm
npm install --save-dev @nuxtjs/snipcart@beta
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
<!-- [npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/snipcart/next.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/snipcart

[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/snipcart

[license-src]: https://img.shields.io/npm/l/@nuxtjs/snipcart.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/snipcart -->
