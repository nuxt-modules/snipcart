<template>
  <div>
    Items Number : <span class="snipcart-items-count" />
    Items price: <span class="snipcart-total-price" />
    <button
      class="snipcart-add-item"
      :data-item-id="product.id"
      :data-item-price="product.price"
      :data-item-url="product.storeUrl"
      :data-item-description="product.description"
      :data-item-name="product.title"
      v-bind="$snipcart.customfields(product.customFields)"
    >
      Add to cart
    </button>
    <button class="snipcart-checkout">
      Click here to checkout
    </button>

    <button class="switch-lang" @click="switchLang">
      switch Lang
    </button>
  </div>
</template>

<script>
export default {
  asyncData (context) {
    // console.log(context.app.$snipcart)
  },
  data: () => ({
    lang: 'fr',
    product: {
      id: 42,
      price: 42,
      storeUrl: 'http://localhost:3000',
      title: 'awesome nuxt title',
      description: 'awesome nuxt description',
      // https://docs.snipcart.com/v3/setup/products#1-dropdown
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
  }),
  methods: {
    switchLang () {
      this.lang = this.lang === 'fr' ? 'en' : 'fr'
      this.$snipcart.setLanguage(this.lang)
    }
  }
}
</script>
