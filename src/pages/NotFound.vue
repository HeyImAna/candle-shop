<template>
  <div class="container">
    <h3>404</h3>
    <h1>Not Found</h1>
    <span
      >The page you are looking for may have been moved, deleted, or possibly never existed</span
    >
    <br />
    <router-link to="/">
      <button class="button">SHOP NOW</button>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.container {
  margin: 22% auto;
  text-align: center;
  border: u.rem(1) solid var(--clr-secondary-500);
  max-width: u.rem(500);
  padding: 2rem;

  .button {
    margin-top: 1rem;
  }
}
</style>
