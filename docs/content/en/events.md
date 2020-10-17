---
title: Events
description: 'Snipcart events'
position: 4
category: Guide
---

## Work with snipcart Events

Check the [snipcart documentation](https://docs.snipcart.com/v3/sdk/events) for more informations for more information.

Basically we do nothing here as when you will have to implement it as you normally do with NuxtJS.

You will have access to `window.Snipcart` when script is loaded. And you will have to add event inside `mounted` hook and of course use beforeDestroy if necessary.

## Example:

```vue
<script>
export default {
  data: () => ({
    addItemEvent: null
  }),
  mounted () {
    document.addEventListener('snipcart.ready', function () {
      this.addItemEvent = window.Snipcart.events.on('item.added', (cartItem) => {
        console.log(cartItem)
      })
    })
  },
  beforeDestroy () {
    this.addItemEvent.unsubscribe()
  },
}
</script>
```


