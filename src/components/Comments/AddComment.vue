<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

import '@mdi/font/css/materialdesignicons.css'
import TextInput from './TextInput.vue'

import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

// toast (START)

const toast = useToast()

const toastShow = () => {
  toast.add({
    severity: 'success',
    summary: 'Success!',
    detail: 'Your comment has been submitted',
    closable: false,
    life: 2000
  })
}

// toast (END)

const form = reactive({
  name: '',
  email: '',
  title: '',
  review: ''
})

const nameComponent = ref({
  type: 'text',
  placeholder: 'Enter your name',
  label: 'Name',
  errorMessage: null,
  pattern: '',
  minLength: 2,
  maxLength: 30
})

const emailComponent = ref({
  type: 'email',
  placeholder: 'e.g. anna.smith@gmail.com',
  label: 'Email',
  errorMessage: null,
  pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  minLength: 6,
  maxLength: 20
})

const titleComponent = ref({
  type: 'text',
  placeholder: 'Give your review a title',
  label: 'Review Title',
  errorMessage: null,
  pattern: '',
  minLength: 6,
  maxLength: 20
})

const reviewComponent = ref({
  type: 'text',
  placeholder: 'Write your comment here',
  label: 'Body Of Review (1000)',
  errorMessage: null,
  pattern: '',
  minLength: 30,
  maxLength: 1000
})

const rating = ref(0)

const isFormValid = ref(true)

const validateForm = (isValid) => {
  isFormValid.value = isValid
}

const onSubmit = async () => {
  try {
    if (!isFormValid.value) {
      alert('The form is invalid')
    } else {
      const obj = {
        name: form.name,
        email: form.email,
        title: form.title,
        review: form.review
      }
      await axios.post(`https://535003ef9da2c472.mokky.dev/comments`, obj)

      window.location.reload()
      toastShow()
    }
  } catch (error) {
    console.log(error)
  }
}

//:class="!isFormValid ? 'button disabled' : 'button'"
</script>

<template>
  <Toast position="top-left" />
  <div class="comment">
    <h3>Write a review</h3>
    <div class="form">
      <TextInput
        v-model="form.name"
        :component-data="nameComponent"
        @form-validate="validateForm"
      />

      <TextInput
        v-model="form.email"
        :component-data="emailComponent"
        @form-validate="validateForm"
      />

      <div class="form__section">
        <label>Rating</label>
        <v-rating
          v-model="rating"
          active-color="grey-darken-3"
          color="grey-darken-3"
          hover
          :clearable="true"
          density="comfortable"
        ></v-rating>
      </div>

      <TextInput
        v-model="form.title"
        :component-data="titleComponent"
        @form-validate="validateForm"
      />

      <TextInput
        v-model="form.review"
        :component-data="reviewComponent"
        @form-validate="validateForm"
      />

      <br />
      <button :disabled="true" @click="onSubmit()" class="button disabled">Add Comment</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../scss/util/index' as u;

.comment {
  border: u.rem(1) solid var(--clr-secondary-500);
  padding: 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  .form,
  .form__section {
    display: flex;
    flex-direction: column;
  }

  .form {
    gap: 1rem;

    .button {
      width: 100%;
    }

    .disabled {
      opacity: 0.8;
      cursor: not-allowed;

      &:hover {
        background-color: #fff;
      }
    }

    &__section {
      gap: 0.2rem;
    }
  }
}
</style>
