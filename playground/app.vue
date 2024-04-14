<template>
  <div class="mx-auto max-w-2xl lg:max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <nav class="flex justify-between items-center">
      <button class="snipcart-customer-signin flex items-center">
        <UserCircleIcon class="h-8 w-8 mr-4" /> My account
      </button>
      <div class="w-10 border border-black" />
      <div class="flex items-start relative">
        <div class="snipcart-total-price mr-4 text-3xl" />
        -
        <div class="snipcart-items-count mx-4 text-3xl" />
        <ShoppingBagIcon class="h-8 w-8 snipcart-checkout cursor-pointer" />
      </div>
    </nav>
  </div>
  <div
    id="product"
    class="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
  >
    <div class="lg:max-w-lg">
      <LazyClientOnly>
        <RadioGroup
          v-model="selected"
          class="flex"
        >
          <RadioGroupOption
            v-for="lang in langs"
            :key="lang"
            v-slot="{ checked }"
            as="template"
            :value="lang"
            class="mr-4"
          >
            <div
              :class="[
                checked ? 'bg-amber-600 text-white ' : 'bg-white',
              ]"
              class="
              capitalize
              text-md
              relative
              flex
              cursor-pointer
              rounded-lg
              px-5
              py-4
              shadow-md
              focus:outline-none
            hover:bg-amber-700 hover:text-white"
              @click="setLanguage(lang,
                                  lang == 'fr'
                                    ? { actions: { continue_shopping: 'Revenir a votre magnifique magasin override runtime' } }
                                    : {},
              )"
            >
              <RadioGroupDescription
                as="span"
              >
                <span>{{ lang }}</span>
              </RadioGroupDescription>
            </div>
          </RadioGroupOption>
        </RadioGroup>
      </LazyClientOnly>
      <div class="mt-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ product.data.name }}
        </h1>
      </div>
      <section
        class="mt-4"
      >
        <div class="flex items-center">
          <p class="text-lg text-gray-900 sm:text-xl">
            {{ product.data.price }}
          </p>
          <div class="ml-4 border-l border-gray-300 pl-4">
            <div class="flex items-center">
              <div>
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[product.data.reviews.average > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">
                  {{ product.data.reviews.average }} out of 5 stars
                </p>
              </div>
              <p class="ml-2 text-sm text-gray-500">
                {{ product.data.reviews.totalCount }} reviews
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4 space-y-6">
          <p class="text-base text-gray-500">
            {{ product.data.description }}
          </p>
        </div>
        <div class="lg:col-start-1 lg:max-w-lg lg:self-start">
          <div class="mt-10">
            <button
              v-bind="bindFullProduct()"
              type="button"
              class="
                  snipcart-add-item
                  flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 py-3 px-8 text-base font-medium text-white hover:bg-amber-700 focus:outline-none
                "
            >
              Add to bag
            </button>
          </div>
          <div class="mt-10">
            <button
              type="button"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 py-3 px-8 text-base font-medium text-white hover:bg-amber-700 focus:outline-none"
              @click="handleCancelStore"
            >
              Cancel store subscibe
            </button>
          </div>
        </div>
      </section>
    </div>
    <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
      <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img
          :src="product.data.src"
          :alt="product.data.alt"
          class="h-full w-full object-cover object-center"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, watch, onMounted } from 'vue'
import { StarIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/vue/20/solid'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import { RadioGroup, RadioGroupDescription, RadioGroupOption } from '@headlessui/vue'
import { useSnipcart } from '#imports'

const langs = [
  'en',
  'fr',
]

const selected = ref(langs[0])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { loadSnipcart, bindProductItemCustom, bindProductItem, setLanguage, isReady, offStore, snipcart } = useSnipcart()

// if you manually want to load snipcart
// watch(isReady, () => {
//   loadSnipcart()
// })

watch(snipcart, () => {
  // to make sure snipcart is loaded
  if (snipcart.value) {
    snipcart.value.events.on('item.adding', () => {
      console.log('article added wowo')
    })
  }
})

const handleCancelStore = () => {
  // this will work if snipcart is loaded and you have the settings subscription to true
  offStore.value()
  console.log(offStore.value)
}

const product = {
  data: {
    name: 'Everyday Shoes',
    price: 220,
    id: 1,
    description:
      'Don\'t compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.',
    src: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=796&q=80',
    alt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
    reviews: { average: 4, totalCount: 7 },
  },
  customFields: [
    {
      name: 'Color',
      options: 'Black|Brown|Gold',
    },
  ],
}

const bindFullProduct = () => {
  return {
    ...bindProductItemCustom(product.customFields),
    ...bindProductItem(product.data),
  }
}
</script>
