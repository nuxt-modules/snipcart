---
title: Ui Customization
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

  Make sure snipcartCustomize is an absolute path. Checkout [example](https://github.com/nuxt-community/nuxt-snipcart/tree/master/example) for more information.

</alert>

It should looks like

```js[customize.js]
module.exports = `
<item-line>
      <li class="bg-red snipcart__item__line snipcart__box">
          <div class="snipcart__item__line__product">
              <div class="snipcart__item__line__header">
                  <h2 class="snipcart__item__line__header__title">
                      {{ item.name }}
                  </h2>

                  <item-quantity class="snipcart__item__line__quantity" v-if="!adding"></item-quantity>
                  <div class="snipcart__item__line__header__actions">
                      <remove-item-action class="snipcart__button--icon">
                          <icon name="trash" class="icon--red"  alt="item.remove_item"></icon>
                      </remove-item-action>
                  </div>
              </div>
          </div>
      </li>
</item-line>
`
```

You will be able to use your custom css with the css global configuration.

```js[nuxt.config.js]
{
  css: ['~/snipcart/customize.css']
}
```

