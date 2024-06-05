<script setup>
import { ref } from 'vue'
import ModalWindow from './ModalWindow.vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  id: Number,
  title: String,
  imageUrl1: String,
  imageUrl2: String,
  price: Number,
  isFavorite: Boolean,
  favoriteId: Number,
  onClickFavorite: Function,
  areFavorites: Boolean
})

const windowOpen = ref(false)
const mouseOn = ref(false)

const closeWindow = () => {
  windowOpen.value = false
  document.body.style.overflow = 'auto'
  document.body.style.pointerEvents = 'auto'
}
const openWindow = () => {
  windowOpen.value = true
  document.body.style.overflow = 'hidden'
  document.body.style.pointerEvents = 'none'
}

const deleteModalRef = ref(null)

onClickOutside(deleteModalRef, closeWindow)
</script>

<template>
  <ModalWindow
    style="pointer-events: auto"
    ref="deleteModalRef"
    v-if="windowOpen"
    @close-window="closeWindow"
    :id="id"
    :title="title"
    :imageUrl1="imageUrl1"
    :price="price"
    :isFavorite="isFavorite"
    :favoriteId="favoriteId"
  />

  <div class="card" @mouseenter="mouseOn = true" @mouseleave="mouseOn = false">
    <button @click="openWindow" class="button card__add">+ ADD TO BAG</button>
    <router-link :to="{ path: `/details/${id}` }">
      <img v-if="!mouseOn" class="card__img" :src="imageUrl1" alt="img" />

      <img v-if="mouseOn" class="card__img" :src="imageUrl2" alt="Card Image" />
    </router-link>
    <div class="card__separator">
      <router-link :to="{ path: `/details/${id}` }"
        ><h2 class="card__title">{{ title }}</h2></router-link
      >

      <div class="bottomFlex">
        <h3 class="card__price">{{ price }}$</h3>

        <img
          class="heart"
          @click="onClickFavorite"
          :src="isFavorite ? '../../public/icons/heart1.png' : '../../public/icons/heart2.png'"
          alt="Like"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.card {
  max-width: u.rem(320);
  min-width: u.rem(250);
  border: u.rem(1) solid var(--clr-secondary-500);
  position: relative;
  margin-inline: auto;

  &:hover .card__add {
    display: block;
  }

  &__add {
    position: absolute;
    text-align: center;
    top: 8.5rem;
    left: 5%;
    cursor: pointer;
    width: 90%;
    display: none;
  }

  &__img {
    height: u.rem(210);
    width: 100%;
    object-fit: cover;
  }

  &__separator {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .heart,
    .remove {
      height: u.rem(20);
      cursor: pointer;
    }

    .remove {
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &__price {
    font-size: u.rem(24);
  }

  &__title {
    cursor: pointer;
    overflow: hidden;
    text-overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: 0.3s ease-out;
    &:hover {
      color: var(--clr-hover);
    }
  }
}
</style>
