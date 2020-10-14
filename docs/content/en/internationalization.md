---
title: Internationalization
description: 'Snipcart Internationalization'
position: 5
category: Guide
---

## customize locales

Snipcart offering you the possibility to override all his [locales keys](https://github.com/snipcart/snipcart-l10n/blob/master/locales/en.json#L123). You can also add more [translations](https://docs.snipcart.com/v3/setup/localization)

```js[nuxt.config.js]
{
  snipcart: {
    snipcartKey: process.env.snipcartKey,
    locales: {
      fr: {
        cart_summary: {
          total: 'Total fr'
        }
        // ...
      },
      en: {
        cart_summary: {
          total: 'Total en'
        }
        // ...
      }
    }
  },
}
```

You can combine your internationalization strategy with our [setLanguage utils](/utils#setlanguage)