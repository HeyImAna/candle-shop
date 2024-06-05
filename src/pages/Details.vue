<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

//components
import Comment from '../components/Comments/Comment.vue'
import AddComment from '../components/Comments/AddComment.vue'

//assets
import dropdown from '../../public/icons/dropdown.svg'

const route = useRoute()
const item = ref('')
const dropdownOpen = ref(false)

const { addItem } = inject('cart')
const { sizes, activeSize, activeCount, onChangeSize, handleClickPlus, handleClickMinus } =
  inject('details')

const getItem = async () => {
  try {
    const { data } = await axios.get(`https://535003ef9da2c472.mokky.dev/items/${route.params.id}`)
    item.value = data
  } catch (error) {
    console.log(error)
  }
}
getItem()

const onClickAddToCart = () => {
  const candle = {
    ...item.value,
    size: sizes[activeSize.value].tag,
    count: activeCount.value
  }
  addItem(candle, activeCount.value)
}
</script>

<template>
  <div class="container">
    <div class="product">
      <img class="product__img" :src="item.imageUrl1" alt="Candle Photo" />
      <div class="product__right">
        <router-link to="/">
          <span style="color: var(--clr-secondary-400); font-size: 14px; cursor: pointer"
            >Home /</span
          >
        </router-link>
        <h2>{{ item.title }}</h2>
        <p>
          Juicy, romantic pomegranate meets rich clove and cedarwood for this alluring tropical
          aroma. It’s fruity and fresh with layers of heart-warming depth. Juicy, romantic
          pomegranate meets rich clove and cedarwood for this alluring tropical aroma. It’s fruity
          and fresh with layers of heart-warming depth.
        </p>
        <div>
          <p><span>Top notes:</span> Camphor, Lemon, Aromatic Notes</p>
          <p><span>Heart notes:</span> Clove, Pomegranate, Raspberry</p>
          <p><span>Base notes:</span> Cedarwood, Musk, Patchouli</p>
        </div>

        <div class="product__dropdown" @click="dropdownOpen = !dropdownOpen">
          <div>
            <span>Product information</span>
            <img :style="dropdownOpen ? 'rotate: 180deg' : ''" :src="dropdown" alt="dropdown" />
          </div>

          <p :style="!dropdownOpen ? 'display: none' : 'display: block'">
            Fill weight: Approx. 1350g <br />Burn time: Approx. 75 hours <br />Dimensions: H11cm x
            W15cm x L15cm
          </p>
        </div>

        <ul class="product__icons">
          <li>
            <img src="../../public/icons/flower1.png" alt="icon" />
            <p>Vegan candles</p>
          </li>
          <li>
            <img src="../../public/icons/truck.png" alt="icon" />
            <p>Free delivery over 40$</p>
          </li>
          <li>
            <img src="../../public/icons/eco.png" alt="icon" />
            <p>Eco friendly</p>
          </li>
        </ul>

        <ul class="product__sizesList" aria-label="sizes">
          <li
            v-for="(size, i) in sizes"
            :key="size.name"
            @click="() => onChangeSize(i)"
            :class="activeSize == i ? 'product__size--active' : 'product__size'"
          >
            {{ size.name }}
          </li>
        </ul>

        <div class="product__details">
          <div>
            <span>Price</span>
            <h3>{{ item.price }}$</h3>
          </div>
          <div>
            <span>Quantity</span>
            <div class="product__count">
              <button @click="handleClickMinus()" class="product__btn">
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
              <button @click="handleClickPlus()" class="product__btn">
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

        <button @click="onClickAddToCart" class="button product__button">+ ADD TO BAG</button>
      </div>
    </div>

    <Comment />
    <AddComment />
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.container {
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 7.5rem 2.5rem;
  margin-inline: auto;

  @media (max-width: 49.98em) {
    gap: 1.5rem;
  }

  .product {
    display: flex;
    gap: 2rem;

    @media (max-width: 49.98em) {
      flex-direction: column;
    }

    &__img {
      position: sticky;
      top: 5rem;
      height: u.rem(686);
      width: 50%;
      object-fit: cover;
      border: u.rem(1) solid var(--clr-secondary-500);

      @media (max-width: 49.98em) {
        height: u.rem(300);
        width: 100%;
        position: inherit;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 50%;

      @media (max-width: 49.98em) {
        width: 100%;
      }
    }

    &__dropdown {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-bottom: u.rem(1) solid var(--clr-secondary-100);
      padding-bottom: 1rem;
      cursor: pointer;

      div {
        display: flex;
        justify-content: space-between;
        gap: 4rem;
        align-items: center;
      }

      img {
        height: u.rem(10);
        cursor: pointer;
      }
    }

    &__icons {
      li {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        img {
          height: u.rem(18);
        }
      }
    }

    &__details {
      display: flex;
      gap: 30%;

      b {
        width: 0.5rem;
      }
    }

    span {
      font-weight: 200;
    }

    &__sizesList,
    &__count {
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
      font-size: clamp(u.rem(24), u.rem(14) + 2vw, u.rem(40));
    }
  }
}
</style>
