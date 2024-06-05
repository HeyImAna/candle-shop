<script setup>
import { reactive, watch, ref, onMounted, inject, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'

import axios from 'axios'
import debounce from 'lodash.debounce'

//components
import Category from '../components/Category.vue'
import Grid from '../components/Grid.vue'
import Filters from '../components/Filters.vue'
import Arrow from '../../public/icons/dropdown.svg'

const { cart } = inject('cart')

const items = ref([]) // { value: [] }
const filtersShow = ref(false)

const filters = reactive({
  sortBy: '-rating',
  material: [],
  oil: [],
  color: [],
  category: 0,
  searchQuery: '',
  rangeSlider: [6, 27]
})

/* RangeSlider (START) */

const onChangeRange = debounce((range) => {
  filters.rangeSlider = [range[0] + 1, range[1]]
}, 1000)

/* RangeSlider (END) */

/* Filters (START) */

const closeFilters = () => {
  filtersShow.value = false
}
const showFilters = () => {
  filtersShow.value = true
}

const deleteFiltersRef = ref(null)
onClickOutside(deleteFiltersRef, closeFilters)

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 1000)

const onChangeCategory = (i) => {
  filters.category = i
}

const onChangeMaterial = (checkedMaterial) => {
  filters.material = checkedMaterial
}

const onChangeOil = (checkedOil) => {
  filters.oil = checkedOil
}

const onChangeColor = (checkedColors) => {
  filters.color = checkedColors
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    if (filters.category > 0) {
      params.category = `${filters.category}`
    }

    const { data } = await axios.get(
      `https://535003ef9da2c472.mokky.dev/items?` +
        filters.material.map((i) => '&material[]=' + i).join('') +
        filters.oil.map((i) => '&oil[]=' + i).join('') +
        filters.color.map((i) => '&color[]=' + i).join('') +
        '&price[from]=' +
        filters.rangeSlider[0] +
        '&price[to]=' +
        filters.rangeSlider[1],
      {
        params
      }
    )

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

/* Filters (END) */

/* Favorites (START) */

const fetchFavorites = async () => {
  try {
    const { data: favs } = await axios.get(`https://535003ef9da2c472.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favs.find((favorite) => favorite.item_id == item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

/* Favorites (END) */

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isFavorite: false
  }))
})

watchEffect(fetchItems, filters)
</script>

<template>
  <Category
    :categoryIdx="filters.category"
    :onChangeSearchInput="onChangeSearchInput"
    :onChangeCategory="onChangeCategory"
  />

  <div class="container">
    <div class="section">
      <Filters
        ref="deleteFiltersRef"
        @close-filters="closeFilters"
        :filtersShow="filtersShow"
        :onChangeMaterial="onChangeMaterial"
        :onChangeOil="onChangeOil"
        :onChangeColor="onChangeColor"
        :onChangeRange="onChangeRange"
      />

      <div class="grid">
        <div class="grid__head">
          <h3>{{ $t('title') }}</h3>
          <div class="search">
            <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 512 512" width="512">
              <title />
              <path
                d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"
              />
            </svg>
            <input @input="onChangeSearchInput" type="text" placeholder="Search... " />
          </div>
          <div class="dropdown">
            {{ $t('sort') }}
            <select @change="onChangeSelect">
              <option value="-rating">{{ $t('top') }}</option>
              <option value="price">{{ $t('lowest') }}</option>
              <option value="-price">{{ $t('highest') }}</option>
            </select>
            <img class="arrow" :src="Arrow" alt="arrow" />
          </div>

          <div class="filterIcon" @click="showFilters">
            <span>Filter</span>
            <svg
              fill="none"
              height="18"
              viewBox="0 0 28 28"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7.0625C2 6.47569 2.48843 6 3.09091 6H24.9091C25.5116 6 26 6.47569 26 7.0625C26 7.64931 25.5116 8.125 24.9091 8.125H3.09091C2.48843 8.125 2 7.64931 2 7.0625Z"
                fill="black"
              />
              <path
                d="M6.90909 14.5C6.90909 13.9132 7.39752 13.4375 8 13.4375H20C20.6025 13.4375 21.0909 13.9132 21.0909 14.5C21.0909 15.0868 20.6025 15.5625 20 15.5625H8C7.39752 15.5625 6.90909 15.0868 6.90909 14.5Z"
                fill="black"
              />
              <path
                d="M12.3636 20.875C11.7612 20.875 11.2727 21.3507 11.2727 21.9375C11.2727 22.5243 11.7612 23 12.3636 23H15.6364C16.2388 23 16.7273 22.5243 16.7273 21.9375C16.7273 21.3507 16.2388 20.875 15.6364 20.875H12.3636Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <span v-if="!items.length">Loading...</span>
        <Grid :items="items" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.section {
  display: flex;
  justify-content: space-between;

  .grid {
    min-width: 75%;
    margin-inline: auto;

    &__head {
      display: flex;
      justify-content: space-between;
      gap: 1rem;

      @media (max-width: 49.98em) {
        flex-wrap: wrap;
      }

      .search {
        display: none;
        @media (max-width: 49.98em) {
          display: block;
          position: relative;
          padding: u.rem(5) u.rem(40);
          outline: u.rem(1) solid var(--clr-secondary-500);
          cursor: pointer;
          max-height: 2.3rem;

          svg {
            width: u.rem(16);
            height: u.rem(16);
            opacity: 0.6;
            position: absolute;
            left: u.rem(15);
            top: u.rem(10);
          }

          input {
            border: none;
            max-width: u.rem(130);

            &:hover,
            &:focus {
              outline: none;
            }

            &::placeholder {
              color: var(--clr-secondary-800);
              opacity: 0.7;
            }
          }
        }
      }

      .dropdown {
        position: relative;
        max-width: u.rem(225);
        margin-bottom: 2rem;

        @media (max-width: 40em) {
          margin-bottom: 1rem;
        }

        select {
          appearance: none;
          margin-left: u.rem(5);
          background-color: #fff;
          padding: u.rem(5);
          border: u.rem(1) solid var(--clr-secondary-500);
          border-radius: 0;
          width: 8.2rem;
          font-family: var(--ff-primary);
          letter-spacing: 0.05rem;
          cursor: pointer;
          outline: none;
        }

        .arrow {
          position: absolute;
          width: u.rem(12);
          top: u.rem(14);
          right: u.rem(14);
          pointer-events: none;
        }
      }

      .filterIcon {
        display: none;
        @media (max-width: 49.98em) {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          max-height: 2.3rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
