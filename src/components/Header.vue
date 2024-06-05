<script setup>
defineProps({
  totalCount: Number
})

const emit = defineEmits(['openCart', 'openLocale'])
</script>

<template>
  <div class="container">
    <header>
      <ul class="icons">
        <li @click="() => emit('openLocale')">
          <img src="/public/icons/lang1.png" alt="Location" class="icons__locale" />
        </li>
        <router-link to="/profile">
          <li>
            <img src="/public/icons/login.png" alt="Login" class="icons__profile" />
          </li>
        </router-link>
      </ul>
      <router-link to="/">
        <h1>CANDLE</h1>
      </router-link>
      <ul class="icons">
        <li class="icons__cart" @click="() => emit('openCart')">
          <div
            class="icons__cart--count"
            :style="totalCount === 0 ? 'display: none' : 'display: block'"
          >
            <div>
              <span>{{ totalCount }}</span>
            </div>
          </div>

          <img src="/public/icons/bag.png" alt="Shopping Bag" class="icons__cart--bag" />
        </li>
        <router-link to="/favorites">
          <li>
            <img src="/public/icons/heart2.png" alt="Favs" class="icons__heart" />
          </li>
        </router-link>
      </ul>
    </header>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

header {
  position: fixed;
  width: 100%;
  min-height: u.rem(81);
  max-width: u.rem(1920);
  background: #fff;
  top: 0;
  left: 0;
  border-bottom: u.rem(1) solid var(--clr-secondary-500);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;

  @media (max-width: 40em) {
    padding: 1rem 1.5rem;
  }
}

.icons {
  display: flex;
  gap: u.rem(20);
  cursor: pointer;
  align-items: center;

  &__profile,
  &__heart {
    width: u.rem(22);

    @media (max-width: 40em) {
      width: u.rem(18);
    }
  }

  &__locale {
    width: u.rem(24);

    @media (max-width: 40em) {
      width: u.rem(18);
    }
  }

  &__cart {
    position: relative;

    &--bag {
      width: u.rem(24);

      @media (max-width: 40em) {
        width: u.rem(20);
      }
    }

    &--count {
      position: absolute;
      top: u.rem(14);
      left: u.rem(12);

      @media (max-width: 40em) {
        top: u.rem(10);
        left: u.rem(10);
      }

      div {
        position: relative;
        background: var(--clr-secondary-800);
        padding: 0.6rem;
        border-radius: 50%;

        span {
          position: absolute;
          color: #fff;
          font-size: u.rem(12);
          z-index: 1001;
          top: u.rem(0.5);
          right: u.rem(6.5);
        }
      }
    }
  }
}
</style>
