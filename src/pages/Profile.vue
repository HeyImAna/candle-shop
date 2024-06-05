<script setup>
import { ref } from 'vue'

//components
import MyAccount from '../components/Profile/MyAccount.vue'
import Coupons from '../components/Profile/Coupons.vue'
import Orders from '../components/Profile/Orders.vue'

/* navigation (START) */
const nav = ['My account', 'Orders', 'Coupons']
const navCategory = ref(0)

const onChangeNav = (i) => {
  navCategory.value = i
}
/* navigation (END) */
</script>

<template>
  <div class="container">
    <nav class="navigation">
      <ul aria-label="Secondary">
        <li
          v-for="(name, i) in nav"
          :key="name"
          @click="() => onChangeNav(i)"
          :class="navCategory == i ? 'active' : ''"
        >
          {{ name }}
        </li>
        <router-link to="/favorites">
          <li>My wish list</li>
        </router-link>
      </ul>
    </nav>

    <MyAccount v-if="navCategory == 0" />

    <Orders v-if="navCategory == 1" />

    <Coupons v-if="navCategory == 2" />
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.container {
  margin: 6.5rem 2.5rem;
  display: flex;
  gap: 2.5rem;

  @media (max-width: 40em) {
    flex-direction: column;
    gap: 0;
  }

  .navigation {
    ul {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @media (max-width: 40em) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
    li {
      text-align: center;
      border: u.rem(1) solid var(--clr-secondary-500);
      cursor: pointer;
      transition: all 0.2s ease-out;
      width: u.rem(120);
      padding: 1rem 0;

      &:hover,
      &:active {
        background-color: var(--clr-hover);
      }
    }
    .active {
      background-color: var(--clr-hover);
    }
  }
}
</style>
