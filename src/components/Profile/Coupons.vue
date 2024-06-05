<template>
  <div class="details">
    <router-link to="/">
      <span style="color: var(--clr-secondary-400); font-size: 14px; cursor: pointer">Home /</span>
    </router-link>
    <h3>COUPONS</h3>
    <hr />
    <div class="details__coupons">
      <img src="../../../public//icons/coupon.png" alt="coupon" />
      <div class="top">
        <h2>20% OFF</h2>
        <p>2024/01/12 01:19:49 - 2024/02/12 01:19:49</p>
      </div>
      <div class="bottom">
        <span>Expired</span>
        <h1>CANDLE</h1>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped lang="scss">
@use '../../../src/scss/util/index' as u;

.details {
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &__coupons {
    position: relative;
    img {
      width: u.rem(330);
    }

    .top {
      position: absolute;
      top: 1rem;
      left: 2rem;

      p {
        font-size: u.rem(12);
        margin-top: 0.2rem;
      }
    }

    .bottom {
      display: flex;
      gap: 0.5rem;
      position: absolute;
      bottom: 1rem;
      left: 2rem;

      h1,
      span {
        font-size: u.rem(12);
        padding: 0.2rem 0.3rem;
      }

      span {
        background-color: var(--clr-secondary-500);
        color: #fff;
        font-weight: 600;
      }

      h1 {
        background-color: var(--clr-secondary-200);
      }
    }
  }

  hr {
    border: u.rem(0.2) solid var(--clr-secondary-500);
  }
}
</style>
