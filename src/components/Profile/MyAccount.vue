<template>
  <div class="details">
    <router-link to="/">
      <span style="color: var(--clr-secondary-400); font-size: 14px; cursor: pointer">Home /</span>
    </router-link>
    <h3>{{ $t('account') }}</h3>
    <hr />

    <div class="details__info">
      <h2>{{ $t('accInfo') }}</h2>
      <div class="section">
        <p>
          <b>{{ $t('name') }}</b
          >Anna Smith
        </p>
        <span>{{ $t('verified') }}</span>
      </div>
      <div class="section">
        <p>
          <b>{{ $t('email') }}</b
          >annasmith@gmail.com
        </p>
        <span>{{ $t('verified') }}</span>
      </div>
      <div class="section">
        <div style="display: flex; gap: 0.5rem; align-items: center">
          <img style="width: 1.5rem" src="../../../public/icons/google.png" alt="Google" />
          <b>G00gle</b>
        </div>

        <span>{{ $t('linked') }}</span>
      </div>
    </div>
    <div class="details__payment">
      <h2>{{ $t('payment') }}</h2>
      <p>{{ $t('noPayment') }} :(</p>
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

  hr {
    border: u.rem(0.2) solid var(--clr-secondary-500);
  }

  &__info {
    .section {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      max-width: u.rem(400);
      min-height: u.rem(40);
      padding: 1rem;
      background-color: var(--clr-secondary-light);
      margin: 1rem 0;

      b {
        padding-right: 0.5rem;
      }

      span {
        color: rgb(62, 128, 62);
        font-weight: 600;
      }
    }
  }

  &__payment {
    p {
      margin: 1rem 0;
    }
  }
}
</style>
