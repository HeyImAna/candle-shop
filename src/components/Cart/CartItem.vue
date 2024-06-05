<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl1: String,
  price: Number,
  size: String,
  count: Number,
  isFavorite: Boolean,
  favoriteId: Number,
  onClickFavorite: Function,
  isOrder: Boolean
})
</script>

<template>
  <div class="item">
    <div class="img-wrap">
      <img class="item__img" :src="imageUrl1" alt="Candle Photo" />
    </div>

    <div class="item__info">
      <h2>{{ title }}</h2>
      <h3>{{ price }}$</h3>

      <div class="item__info--tags">
        <p>Quantity: {{ count }}</p>
        <p>Size: {{ size }}</p>
      </div>
    </div>

    <div v-if="!isOrder" class="item__icons">
      <img
        @click="onClickFavorite"
        class="item__icons--heart"
        :src="isFavorite ? '../../public/icons/heart1.png' : '../../public/icons/heart2.png'"
        alt="Favorite"
      />
      <img
        @click="emit('onClickRemove')"
        class="item__icons--remove"
        src="../../../public/icons/delete.png"
        alt="Delete"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../scss/util/index' as u;

.item {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  box-shadow: 0 u.rem(3) u.rem(2) u.rem(-2) lightgray;
  padding: 0.5rem;

  .img-wrap {
    height: u.rem(105);
    width: u.rem(150);
  }

  &__img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &--tags {
      display: flex;
      gap: 1rem;

      p {
        font-size: u.rem(14);
      }
    }
  }

  &__icons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3.7rem;
    max-width: u.rem(20);

    img {
      min-width: 1.2rem;
      opacity: 0.6;
      cursor: pointer;
    }

    &--remove {
      &:hover {
        opacity: 0.8;
      }
    }
  }

  h2,
  h3 {
    font-size: 1.1rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
