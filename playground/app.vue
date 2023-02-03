<template>
  <div>
    Nuxt module playground!
    <button
      class="snipcart-add-item"
      data-item-id="starry-night"
      data-item-price="79.99"
      data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
      data-item-image="https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      data-item-name="The Starry Night"
    >
      Add to cart
    </button>
    <ClientOnly>
      <button
        class="snipcart-add-item"
        v-bind="{
          ...snipcart.customFields(product.customFields),
          ...snipcart.bindProduct(product.data)
        }"
      >
        Add to cart with custom field
      </button>
    </ClientOnly>
    <div>
      <div>
        Items count:
        <span class="snipcart-items-count" />
      </div>
      <div>
        Total price:
        <span class="snipcart-total-price" />
      </div>
    </div>
    <button class="snipcart-checkout">
      Click here to checkout
    </button>
    <!-- <button @click="loadSnipcart">
      Load snipcart
    </button> -->

    <button @click="switchLang">
      Switch lang
    </button>

    <button
      class="switch-currency"
      @click="switchCurrency('eur')"
    >
      Change Currency to euros
    </button>
    <button
      class="switch-currency"
      @click="switchCurrency('usd')"
    >
      Change Currency to dollars
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSnipcart } from '#imports';
import { ref } from "vue"

const snipcart = useSnipcart()

const lang = ref("fr")

// if you want to load snipcart manually make sure to update the options
// const loadSnipcart = () => {
//   snipcart.getSettings().LoadSnipcart()
// }

const switchLang = () => {
  lang.value = lang.value === 'fr' ? 'en' : 'fr'
  snipcart.setLanguage(lang.value)
}

const product = {
  data: {
    id: 42,
    price: 42,
    storeUrl: 'http://localhost:3000',
    name: 'awesome nuxt title',
    description: 'awesome nuxt description'
  },
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


const switchCurrency = (switchCurrency : string) => {
  snipcart.setCurrency(switchCurrency)

}

</script>
