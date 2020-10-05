<template>
  <div>
    <button
      class="snipcart-add-item"
      :data-item-id="product.id"
      :data-item-price="product.price"
      :data-item-url="product.storeUrl"
      :data-item-description="product.description"
      :data-item-name="product.title"
    >
      Add to cart
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    product: {
      id: 42,
      price: 42,
      storeUrl: 'http://localhost:3000',
      title: 'awesome nuxt title',
      description: 'awesome nuxt description'
    }
  })
}
</script>
