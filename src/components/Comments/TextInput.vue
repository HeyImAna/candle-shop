<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  modelValue: {
    required: true
  },
  componentData: {
    type: Object,
    default: () => {
      return {
        type: 'text',
        placeholder: 'Placeholder',
        label: 'Label',
        errorMessage: null,
        pattern: '',
        minLength: null,
        maxLength: null
      }
    }
  }
})

const localError = ref('')

const emit = defineEmits(['update:modelValue', 'form-validate'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const validate = (event) => {
  const isPatternValid = props.componentData.pattern
    ? !!event.target.value.match(props.componentData.pattern)
    : true

  const isLengthValid =
    event.target.value.length >= props.componentData.minLength &&
    event.target.value.length <= props.componentData.maxLength

  if (!isLengthValid) {
    localError.value = `The text may not be shorter than ${props.componentData.minLength} and longer than ${props.componentData.maxLength} characters`
  } else if (!isPatternValid) {
    localError.value = 'Please enter a valid email address'
  } else {
    localError.value = ''
  }

  emit('form-validate', !!(isPatternValid && isLengthValid))
}
</script>

<template>
  <div class="section">
    <label for="name">{{ props.componentData.label }}</label>
    <textarea
      v-if="props.componentData.label == 'Body Of Review (1000)'"
      :type="props.componentData.type"
      @input="handleInput"
      :placeholder="props.componentData.placeholder"
      @blur="validate"
      cols="30"
      rows="5"
    ></textarea>
    <input
      v-else
      :type="props.componentData.type"
      @input="handleInput"
      :placeholder="props.componentData.placeholder"
      @blur="validate"
    />

    <span v-if="props.componentData.errorMessage || localError">{{
      props.componentData.errorMessage || localError
    }}</span>
  </div>
</template>

<style scoped lang="scss">
@use '../../scss/util/index' as u;

.section {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  input,
  textarea {
    outline: none;
    padding: 0.3rem;
    border: u.rem(1) solid var(--clr-secondary-100);
  }

  span {
    color: rgb(175, 32, 32);
    font-size: u.rem(14);
  }
}
</style>
