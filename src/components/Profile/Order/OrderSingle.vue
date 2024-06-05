<script setup>
import CartItem from '@/components/Cart/CartItem.vue'

defineProps({
  items: Array,
  totalSum: Number,
  orderNum: Number,
  totalCount: Number
})
</script>

<template>
  <div class="single">
    <div class="single__heading">
      <p>Order number: {{ orderNum }}</p>
      <p>Amount of items: {{ totalCount }}</p>
    </div>
    <div>
      <CartItem
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :count="item.count"
        :title="item.title"
        :imageUrl1="item.imageUrl1"
        :price="item.price"
        :size="item.size"
        is-order
      />
    </div>
    <p class="single__footer">Total Sum: {{ totalSum }} $</p>
  </div>
</template>

<style scoped lang="scss">
@use '../../../scss/util/index' as u;

.single {
  padding: 1rem 0;

  &__heading {
    display: flex;
    gap: 4rem;
    background-color: var(--clr-secondary-500);
    color: #fff;
    padding: 0.5rem;
  }

  &__footer {
    text-align: end;
    padding: 0.5rem;
    background-color: var(--clr-hover1);
  }
}
</style>
