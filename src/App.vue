<script setup>
import { ref, watch, provide, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

// Components
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Locale from './components/Locale.vue'
import Toast from 'primevue/toast'

/* Toast (START) */

const toast = useToast()
const orderNum = Math.floor(Math.random() * 120)

const toastShow = () => {
  toast.add({
    severity: 'success',
    summary: 'Success!',
    detail: `Your order number ${orderNum}.`,
    closable: false,
    life: 2000
  })
}

/* Toast (END) */

/* Cart (START) */

const cart = ref([])
const totalCount = computed({
  get() {
    return cart.value.reduce((acc, item) => acc + item.count, 0)
  },
  set(newValue) {
    newValue = newValue - 1
  }
})
const totalSum = computed(() => cart.value.reduce((acc, item) => acc + item.price * item.count, 0))

const cartOpen = ref(false)
const deleteCartRef = ref(null)

const closeCart = () => {
  cartOpen.value = false
  document.body.style.overflow = 'auto'
  document.body.style.pointerEvents = 'auto'
}
const openCart = () => {
  cartOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.pointerEvents = 'none'
}

onClickOutside(deleteCartRef, closeCart)

const addItem = (item, activeCount) => {
  const findItem = cart.value.find((obj) => obj.id === item.id && obj.size == item.size)

  if (findItem) {
    findItem.count + activeCount
    totalCount.value += findItem.count
  } else {
    cart.value.push({
      ...item,
      count: activeCount
    })
    totalCount.value += activeCount
  }

  openCart()
}

const removeFromCart = (item) => {
  totalCount.value -= item.count
  cart.value.splice(cart.value.indexOf(item), 1)
}

//orders

const createOrder = async () => {
  try {
    const { data } = await axios.post(`https://535003ef9da2c472.mokky.dev/orders`, {
      items: cart.value,
      totalSum: totalSum.value,
      orderNum: orderNum,
      totalCount: totalCount.value
    })

    cart.value = []

    toastShow()

    return data
  } catch (error) {
    console.log(error)
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  removeFromCart,
  addItem
})

/* Cart (END) */

/* Favorites (START) */

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true

      const { data } = await axios.post(`https://535003ef9da2c472.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://535003ef9da2c472.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

provide('favorites', {
  addToFavorite
})

/* Favorites (END) */

/* Details (START) */

const sizes = [
  {
    name: 'Small',
    tag: 'S'
  },
  {
    name: 'Medium',
    tag: 'M'
  },
  {
    name: 'Large',
    tag: 'L'
  }
]

const activeSize = ref(0)
const activeCount = ref(1)

const onChangeSize = (i) => {
  activeSize.value = i
}

const handleClickPlus = () => {
  activeCount.value++
}

const handleClickMinus = () => {
  if (activeCount.value >= 2) {
    activeCount.value--
  } else {
    activeCount.value = 1
  }
}

provide('details', {
  sizes,
  activeSize,
  activeCount,
  onChangeSize,
  handleClickPlus,
  handleClickMinus
})

/* Details (END) */

/* locale (START) */

const localeOpen = ref(false)
const deleteLocaleRef = ref(null)

onMounted(() => {
  document.cookie = 'locale=EN'
})

const closeLocale = () => {
  localeOpen.value = false
}
const openLocale = () => {
  localeOpen.value = true
}

onClickOutside(deleteLocaleRef, closeLocale)

/* locale (START) */
</script>

<template>
  <Toast position="top-left" />

  <Drawer
    style="pointer-events: auto"
    ref="deleteCartRef"
    @create-order="createOrder"
    :total-sum="totalSum"
    v-if="cartOpen"
    :closeCart="closeCart"
  />

  <Locale ref="deleteLocaleRef" v-if="localeOpen" @close-locale="closeLocale" />

  <div class="wrapper">
    <Header @open-cart="openCart" @open-locale="openLocale" :total-count="totalCount" />

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 40em) {
    gap: 1rem;
  }
}
</style>
