<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import Grid from '../components/Grid.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://535003ef9da2c472.mokky.dev/favorites?_relations=items`
    )

    const item = data.map((item) => {
      return {
        ...item
      }
    })

    favorites.value = item.map((obj) => {
      return {
        ...obj.item,
        isFavorite: true,
        favoriteId: obj.id
      }
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="container">
    <router-link to="/">
      <span style="color: var(--clr-secondary-400); font-size: 14px; cursor: pointer">Home /</span>
    </router-link>
    <h3>MY WISH LIST</h3>
    <span v-if="!favorites.length">Loading...</span>
    <Grid :items="favorites" are-favorites />
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.container {
  margin: 6.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
