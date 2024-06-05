<script setup>
defineProps({
  categoryIdx: Number,
  onChangeSearchInput: Function,
  onChangeCategory: Function
})

const categories = ['All', 'Fruity', 'Woody', 'Floral', 'Diffusers']
</script>

<template>
  <nav>
    <ul class="navList" aria-label="Primary">
      <li
        v-for="(category, i) in categories"
        :key="category"
        @click="() => onChangeCategory(i)"
        :class="categoryIdx == i ? 'active' : 'category'"
      >
        {{ category }}
      </li>
      <li class="search">
        <svg xmlns="http://www.w3.org/2000/svg" height="512" viewBox="0 0 512 512" width="512">
          <title />
          <path
            d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z"
          />
        </svg>
        <input @input="onChangeSearchInput" type="text" placeholder="Search... " />
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

nav {
  border-top: u.rem(1) solid var(--clr-secondary-500);
  border-bottom: u.rem(1) solid var(--clr-secondary-500);
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  @media (max-width: 35em) {
    overflow-x: scroll;
  }

  .navList {
    display: flex;
    justify-content: center;

    li {
      position: relative;
      padding: u.rem(10) u.rem(65);
      outline: u.rem(1) solid var(--clr-secondary-500);
      margin-left: u.rem(1);
      cursor: pointer;

      @media (max-width: 72em) {
        padding: u.rem(10) u.rem(50);
      }

      @media (max-width: 60em) {
        padding: u.rem(10) u.rem(35);
      }

      svg {
        width: u.rem(16);
        height: u.rem(16);
        opacity: 0.6;
        position: absolute;
        left: u.rem(35);
        top: u.rem(15);

        @media (max-width: 72em) {
          left: u.rem(15);
        }
      }

      input {
        border: none;
        max-width: u.rem(65);
        transition: 0.5s ease-out;

        &:hover,
        &:focus {
          outline: none;
          max-width: u.rem(140);
        }

        &::placeholder {
          color: var(--clr-secondary-800);
          opacity: 0.7;
        }
      }
    }

    .search {
      @media (max-width: 49.98em) {
        display: none;
      }
    }

    .category {
      transition: all 0.2s ease-out;

      &:hover {
        background-color: var(--clr-hover);
      }
    }

    .active {
      background-color: var(--clr-hover);
    }
  }
}
</style>
