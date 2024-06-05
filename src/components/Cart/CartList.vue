<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cart')
const { addToFavorite } = inject('favorites')
</script>

<template>
  <div class="list" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :imageUrl1="item.imageUrl1"
      :price="item.price"
      :size="item.size"
      :count="item.count"
      :isFavorite="item.isFavorite"
      :favoriteId="item.favoriteId"
      @on-click-remove="() => removeFromCart(item)"
      :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '../../scss/util/index' as u;

.list {
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  top: u.rem(10);
  position: sticky;
  overflow-y: scroll;
  max-height: 72vh;
}
</style>
