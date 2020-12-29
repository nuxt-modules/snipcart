---
title: Setup
description: 'Setup configuration'
position: 2
category: Guide
version: 1.1.0
---

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information on installing and using modules in Nuxt.js.

## Installation

Add `@nuxtjs/snipcart` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxtjs/snipcart
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxtjs/snipcart
  ```

  </code-block>
</code-group>

Then, add `@nuxtjs/snipcart` to the `modules` section of `nuxt.config.js`:

```js[nuxt.config.js]
{
  buildModules: [
    '@nuxtjs/snipcart'
  ],
  snipcart: {
    // Options available
    version: /* not required default value is v3.0.23 */,
    key: /* required https://app.snipcart.com/dashboard/account/credentials */,
    attributes: /* not required default [] */,
    locales: {} /* not required */,
    snipcartCustomize: '' /* not required should be absolute path */
  }
}
```

## Options

Check our [example](https://github.com/nuxt-community/snipcart-module/tree/master/example) folder to see a default implementation of all features available.

### version

We are currently using snipcart version v3.0.23 by default but you can override at any moment. But we suggest you to stay in the default version.

### key

[The snipcart token](https://app.snipcart.com/dashboard/account/credentials) that you can retrieve.

### attributes

It can happen you may want to add more data-item to snipcart initialization. By passing them into attributes they should work properly.

```js[nuxt.config.js]
module.exports = {
  snipart: {
    ...,
    
    attributes: [
      // ['data-config-modal-style', 'side']
      // ['data-config-add-product-behavior', 'none']
    ]
  }
}
```

### locales

Snipcart offering you the possibility to override all his [locales keys](https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json#L123). You can also add more [translations](https://docs.snipcart.com/v3/setup/localization)

[Check our doc](/internationalization) for more informations


### snipcartCustomize

Snipcart let you "override" their default components.

[Check our doc](/customization) for more informations

We will watch this folder to reload nuxt on change. 
