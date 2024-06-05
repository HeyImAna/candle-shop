<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css'

const comments = ref([])
const rating = ref(4)

const fetchComments = async () => {
  try {
    const { data } = await axios.get(`https://535003ef9da2c472.mokky.dev/comments`)

    comments.value = data.map((obj) => obj)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchComments()
})
</script>

<template>
  <div class="displayComment">
    <hr />

    <h3>REVIEWS</h3>

    <div class="displayComment__flex">
      <v-card
        class="shadow-none d-flex flex-column mx-auto py-8 rounded-0 border border-dark"
        elevation="0"
        height="495"
        width="280"
      >
        <div class="d-flex align-center flex-column my-auto">
          <div class="text-h2 mt-5">
            4
            <span class="text-h6 ml-n3">/5</span>
          </div>

          <v-rating :model-value="4" color="grey-darken-3" half-increments></v-rating>
          <div class="px-3">165 ratings</div>
        </div>

        <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
          <v-list-item v-for="(rating, i) in 5" :key="i">
            <v-progress-linear
              :model-value="rating * 11"
              class="mx-n5"
              color="grey-darken-3"
              height="20"
            ></v-progress-linear>

            <template v-slot:prepend>
              <span>{{ rating }}</span>
              <v-icon class="mx-3" icon="mdi-star"></v-icon>
            </template>

            <template v-slot:append>
              <div class="rating-values">
                <span class="d-flex justify-end"> {{ rating * 11 }} </span>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-card>

      <div class="wrap">
        <div v-for="item in comments" :key="item.id" :id="item.id" class="wrap__body">
          <v-rating
            v-model="rating"
            active-color="grey-darken-3"
            color="grey-darken-3"
            :readonly="true"
            density="comfortable"
            size="small"
          ></v-rating>

          <h2>{{ item.title }}</h2>
          <p>{{ item.name }} on <span>01/05.2024</span></p>
          <p>
            {{ item.review }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../scss/util/index' as u;

$ani-speed: 2s;
$ani-delay: 1s;

.displayComment {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  hr {
    border: u.rem(0.2) solid var(--clr-secondary-500);
  }

  h3 {
    text-align: center;
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    @media (max-width: 49.98em) {
      flex-direction: column;
    }

    .wrap {
      display: flex;
      flex-direction: column;
      width: 70%;
      padding-right: 1rem;
      top: u.rem(10);
      position: sticky;
      overflow-y: scroll;
      margin-inline: auto;

      max-height: 60.5vh;

      @media (max-width: 49.98em) {
        width: 100%;
      }

      &__body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 2rem;
        border-bottom: u.rem(1) solid var(--clr-secondary-100);
        margin-bottom: 2rem;

        span {
          font-weight: 200;
        }
      }
    }
  }
}
</style>
