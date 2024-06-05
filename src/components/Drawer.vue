<script setup>
import CartList from './Cart/CartList.vue'

defineProps({
  totalSum: Number,
  closeCart: Function
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="drawer">
    <div>
      <div class="drawer__top">
        <h3>SHOPPING BAG</h3>

        <img
          class="close"
          @click="() => closeCart()"
          src="../../public/icons/close.png"
          alt="Close"
        />
      </div>

      <div v-if="totalSum === 0" class="drawer__cartEmpty">
        <h3>Your cart is empty</h3>
        <button class="button" @click="() => closeCart()">SHOP NOW</button>
      </div>

      <CartList v-else />
    </div>

    <button
      @click="() => emit('createOrder')"
      :style="totalSum === 0 ? 'display: none' : 'display: block'"
      class="button drawer__button disabled"
      :disabled="true"
    >
      PLACE ORDER | TOTAL: {{ totalSum }}$
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.drawer {
  position: fixed;
  background-color: #fff;
  height: 100%;
  width: u.rem(360);
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 u.rem(3) u.rem(2) u.rem(-2) lightgray;
    padding: 0.5rem;
  }

  &__cartEmpty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 0;
  }

  &__button {
    width: 100%;
  }
}

.disabled {
  opacity: 0.8;
  cursor: not-allowed;

  &:hover {
    background-color: #fff;
  }
}
</style>
