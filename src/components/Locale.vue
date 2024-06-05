<script setup>
const emit = defineEmits(['closeLocale'])
</script>

<template>
  <div class="contact">
    <div class="flex" @click="$i18n.locale = `EN`">
      <img style="width: 30px" src="../../public/icons/en.png" alt="en" /><span>English</span>
    </div>
    <div class="flex" @click="$i18n.locale = `RU`">
      <img style="width: 30px" src="../../public/icons/ru.png" alt="en" /><span>Русский</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

.contact {
  position: fixed;
  background-color: #fff;
  top: 4rem;
  left: 2.5rem;
  height: 5.25rem;
  width: 7.5rem;
  z-index: 1000;
  border: u.rem(1) solid var(--clr-secondary-500);
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  .flex {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem;

    &:hover {
      background-color: var(--clr-hover1);
    }
  }
}
</style>
