---
title: Customization
description: 'Snipcart customization'
position: 4
category: Guide
---

## customize ui components

[Customizing components](https://docs.snipcart.com/v3/setup/customization) is easy with snipcart. We let you the possibility to inject a string components templates into `@nuxtjs/snipcart`.

```js[nuxt.config.js]
{
  snipcart: {
    snipcartKey: process.env.snipcartKey,
    snipcartCustomize: path.join(__dirname, './snipcart/customize'),
  },
}
```

<alert type="info">

  Make sure snipcartCustomize is an absolute path. Checkout [example](https://github.com/f3ltron/nuxt-snipcart/tree/master/example) for more information.

</alert>

You will be able to use your custom css with the css global configuration.

```js[nuxt.config.js]
{
  css: ['~/snipcart/customize.css']
}
```

## customize locales

Checkout [snipcart customization documentation](https://docs.snipcart.com/v3/setup/localization) for more informations

```js[nuxt.config.js]
{
  snipcart: {
    snipcartKey: process.env.snipcartKey,
    snipcartCustomize: path.join(__dirname, './snipcart/customize'),
    locales: {
      fr: {
        cart_summary: {
          total: 'Total fr'
        }
      },
      en: {
        cart_summary: {
          total: 'Total en'
        }
      }
    }
  },
}
```
