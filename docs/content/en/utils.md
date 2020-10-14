---
title: Utils
description: 'Snipcart utils'
position: 3
category: Guide
---

Check the [snipcart products documentation](https://docs.snipcart.com/v3/setup/products) for more information about custom fields.

## CustomFields

You will have access to the `$snipcart.customfields` function in your project. It will help you bind custom fields from your product.

<alert type="warning">
  We are transforming the data for `v-bind`. We are not performing any tests.
  You have to handle the transformation of your data in respect to the snipcart documentation.
</alert>

### Usage

You can check out our [example](https://github.com/nuxt-community/nuxt-snipcart/tree/master/example).

<alert type="info">
  You can access the utils functions anywhere in your app. For example, `asyncData`, `mounted`, `vuex`, etc.
</alert>

```vue
<template>
  <div>
    <button
      class="snipcart-add-item"
      v-bind="$snipcart.customfields(product.customFields)"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    product: {
      customFields: [
        // dropdown
        {
          name: 'Frame color',
          options: 'Black|Brown|Gold'
        },
        // text note
        {
          name: 'Gift note'
        },
        // checkbox
        {
          name: 'Gift',
          type: 'checkbox'
        },
        // textarea
        {
          name: 'Long message',
          type: 'textarea'
        },
        // readonly
        {
          name: 'Readonly information',
          type: 'readonly',
          value: 'This is a readonly custom field'
        },
        // default value
        {
          name: 'awesome default value',
          options: 'Black|Brown[+100.00]|Gold[+300.00]',
          value: 'Brown'
        },
        // required
        {
          name: 'Special comments',
          type: 'textarea',
          required: 'true'
        },
        // placeholder
        {
          name: 'Engraving',
          placeholder: 'ex: John Doe'
        }
      ]
    }
  })
  asyncData(context) {
    console.log(context.app.$snipcart)
  }
}
</script>

```


## setLanguage

See more about localization in our [customization part](customization#customize-locales).

By default snipcart will check for html lang variable so please consider to use it instead before using this utils.

You have access to `$snipcart.setLanguage`. It should be only executed on front. You will have an error if you try to execute it from the server.

### Usage

```vue

<template>
  <div>
    <button class="switch-lang" @click="switchLang">
      switch Lang
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    switchLang () {
      this.lang = this.lang === 'fr' ? 'en' : 'fr'
      this.$snipcart.setLanguage(this.lang)
    }
  }
}
</script>

```

checkout our [example](https://github.com/nuxt-community/nuxt-snipcart/tree/master/example) repo for more informations


## bindProduct

You can add informations by default with snipcart by yourself.

```html
<button
  class="snipcart-add-item"
  v-bind="$snipcart.customfields(product.customFields)"
  :data-item-id="product.id"
  :data-item-price="product.price"
  :data-item-url="product.storeUrl"
  :data-item-description="product.description"
  :data-item-name="product.title"
>
  Add to cart
</button>
```
Or you can use the utils do the job for you.

<alert type="warning">
  We are transforming the data for `v-bind`. We are not performing any tests.
  You have to handle the transformation of your data in respect to the snipcart documentation.
</alert>

### Usage

```html
<button
  class="snipcart-add-item"
  v-bind="{
    ...$snipcart.customfields(product.customFields),
    ...$snipcart.bindProduct(product)
  }"
>
  Add to cart
</button>
```

or without custom fields

```html
<button
  class="snipcart-add-item"
  v-bind="$snipcart.bindProduct(product)"
>
  Add to cart
</button>
```

