---
title: Setup
description: ''
position: 2
category: Guide
---

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

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
    // Options
    snipcart_version: /* not required default value is v3.0.22 */
    snipcart_key: /* required https://app.snipcart.com/dashboard/account/credentials */
  }
}
```
