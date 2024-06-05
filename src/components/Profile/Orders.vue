<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import OrderSingle from '../Profile/Order/OrderSingle.vue'

const orders = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://535003ef9da2c472.mokky.dev/orders')

    orders.value = data.map((item) => {
      return {
        items: item.items,
        totalSum: item.totalSum,
        orderNum: item.orderNum,
        totalCount: item.totalCount
      }
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="orders">
    <router-link to="/">
      <span style="color: var(--clr-secondary-400); font-size: 14px; cursor: pointer">Home /</span>
    </router-link>
    <h3>ORDERS</h3>
    <hr />

    <div class="orders__list" v-auto-animate>
      <OrderSingle
        v-for="item in orders"
        :key="item.orderNum"
        :items="item.items"
        :totalSum="item.totalSum"
        :orderNum="item.orderNum"
        :totalCount="item.totalCount"
      />
    </div>
    <span v-if="!orders.length">Loading...</span>

    <hr />
  </div>
</template>

<style scoped lang="scss">
@use '../../../src/scss/util/index' as u;

.orders {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__list {
    padding-right: 0.5rem;
    top: u.rem(10);
    position: sticky;
    overflow-y: scroll;
    max-height: 72vh;
  }

  hr {
    border: u.rem(0.2) solid var(--clr-secondary-500);
  }
}
</style>
