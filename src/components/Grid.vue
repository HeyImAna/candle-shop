<script setup>
import Card from './Card.vue'
import { inject } from 'vue'

defineProps({
  items: Array,
  areFavorites: Boolean
})

const { addToFavorite } = inject('favorites')
</script>

<template>
  <section>
    <div class="container__separator">
      <div
        class="grid"
        v-auto-animate
        :style="areFavorites ? 'grid-template-columns: repeat(4, 1fr)' : ''"
      >
        <Card
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :imageUrl1="item.imageUrl1"
          :imageUrl2="item.imageUrl2"
          :price="item.price"
          :isFavorite="item.isFavorite"
          :favoriteId="item.favoriteId"
          :areFavorites="areFavorites"
          :onClickFavorite="() => addToFavorite(item)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;
.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(u.rem(250), 1fr));
}
</style>
