<script setup>
import { inject } from 'vue'

const candle = defineProps({
  id: Number,
  title: String,
  imageUrl1: String,
  price: Number,
  isFavorite: Boolean,
  favoriteId: Number
})

const { addItem } = inject('cart')
const { sizes, activeSize, activeCount, onChangeSize, handleClickPlus, handleClickMinus } =
  inject('details')

const emit = defineEmits(['closeWindow'])
const onClickCloseWindow = () => emit('closeWindow')

const onClickAddToCart = () => {
  const item = {
    ...candle,
    size: sizes[activeSize.value].tag,
    count: activeCount.value
  }
  addItem(item, activeCount.value)
  onClickCloseWindow()
}
</script>

<template>
  <div class="addWindow">
    <div style="display: flex; justify-content: space-between">
      <div></div>
      <img
        @click="onClickCloseWindow"
        class="close"
        src="../../public/icons/close.png"
        alt="Close"
      />
    </div>

    <div class="addWindow__info">
      <img class="addWindow__img" :src="imageUrl1" alt="Candle Photo" />
      <div class="addWindow__right">
        <h2>{{ title }}</h2>
        <p>
          Juicy, romantic pomegranate meets rich clove and cedarwood for this alluring tropical
          aroma. It’s fruity and fresh with layers of heart-warming depth.
        </p>
        <div class="notes">
          <p><span>Top notes:</span> Camphor, Lemon, Aromatic Notes</p>
          <p><span>Heart notes:</span> Clove, Pomegranate, Raspberry</p>
          <p><span>Base notes:</span> Cedarwood, Musk, Patchouli</p>
        </div>

        <ul class="addWindow__sizesList" aria-label="sizes">
          <li
            v-for="(size, i) in sizes"
            :key="size.name"
            @click="() => onChangeSize(i)"
            :class="activeSize == i ? 'addWindow__size--active' : 'addWindow__size'"
          >
            {{ size.name }}
          </li>
        </ul>

        <div class="addWindow__details">
          <div>
            <span>Price</span>
            <h3>{{ price }}$</h3>
          </div>
          <div>
            <span>Quantity</span>
            <div class="addWindow__productCount">
              <button @click="handleClickMinus()" class="addWindow__btn">
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#000"
                  ></path>
                </svg>
              </button>
              <b>{{ activeCount }}</b>
              <button @click="handleClickPlus()" class="addWindow__btn">
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#000"
                  ></path>
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button @click="onClickAddToCart" class="button addWindow__button">+ ADD TO BAG</button>
        <router-link :to="{ path: `/details/${id}` }"
          ><span style="font-size: small; cursor: pointer">See Details ></span></router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.addWindow {
  max-width: u.rem(990);
  position: fixed;
  background-color: #fff;
  top: 20%;
  height: 74%;
  left: 5%;
  max-height: u.rem(600);
  width: 90%;
  overflow-y: scroll;
  z-index: 1;
  padding: 1.5rem;
  border: u.rem(1) solid var(--clr-secondary-500);
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  @media (max-width: 49.98em) {
    padding: 0.5rem;
  }

  &__info {
    display: flex;
    gap: 2rem;
    padding: 0rem 1.5rem;
    justify-content: center;

    @media (max-width: 49.98em) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
  }

  &__img {
    height: u.rem(500);
    max-width: u.rem(470);
    width: 50%;
    object-fit: cover;
    border: u.rem(1) solid var(--clr-secondary-500);

    @media (max-width: 49.98em) {
      max-height: u.rem(200);
      width: 100%;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: space-between;
    width: 50%;
    max-width: u.rem(470);

    @media (max-width: 49.98em) {
      width: 100%;
    }

    .notes {
      @media (max-width: 49.98em) {
        display: none;
      }
    }
  }

  &__details {
    display: flex;
    gap: 30%;
  }

  span {
    font-weight: 200;
  }

  &__sizesList,
  &__productCount {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__size,
  &__btn,
  &__size--active {
    border: u.rem(1) solid var(--clr-secondary-400);
    padding: 0.5rem 1rem;
    cursor: pointer;

    @media (max-width: 49.98em) {
      padding: 0.3rem 0.5rem;
    }

    &--active {
      background-color: var(--clr-hover1);
    }

    &:hover {
      background-color: var(--clr-hover1);
      border: u.rem(1) solid var(--clr-secondary-500);
    }
  }

  &__btn {
    max-width: 2.5rem;
    margin-top: 0.2rem;
  }

  &__button {
    width: 100%;
  }

  h2 {
    font-size: clamp(u.rem(24), u.rem(14) + 1vw, u.rem(32));
  }
}
</style>
