<script setup>
import { ref } from 'vue'
import '@mdi/font/css/materialdesignicons.css'

defineProps({
  onChangeMaterial: Function,
  onChangeOil: Function,
  onChangeColor: Function,
  onChangeRange: Function,
  filtersShow: Boolean
})

const emit = defineEmits(['closeFilters'])

const range = ref([6, 27])

const checkedMaterial = ref([])
const checkedOil = ref([])
const checkedColors = ref([])

const materials = ['Paraffin wax', 'Soy wax', 'Palm wax', 'Coconut wax']
const oils = [
  'Lavander',
  'Peppermint',
  'Tea Tree',
  'Eucalypptus',
  'Cinnamon',
  'Lemon',
  'Sandalwood',
  'Cedarwood',
  'Lilac',
  'Lily'
]
const colors = ['White', 'Blue', 'Red', 'Orange', 'Pink', 'Brown', 'Green']
</script>

<template>
  <aside :style="filtersShow ? 'display: block' : ''">
    <h3>{{ $t('filter') }}</h3>
    <div class="sidebar">
      <img
        @click="() => emit('closeFilters')"
        class="close"
        src="../../public/icons/close.png"
        alt="Close"
      />
      <div>
        <h2>{{ $t('material') }}</h2>

        <div class="sidebar__content">
          <label v-for="(material, i) in materials" :key="material">
            <input
              @change="() => onChangeMaterial(checkedMaterial)"
              type="checkbox"
              :value="i + 1"
              v-model="checkedMaterial"
            />
            {{ material }}
          </label>
        </div>
      </div>

      <div>
        <h2>{{ $t('price') }} $</h2>
        <div class="sidebar__content">
          <v-range-slider
            v-model="range"
            @update:model-value="() => onChangeRange(range)"
            :max="27"
            :min="6"
            :step="1"
            style="margin-inline: 0px"
            class="align-center"
            hide-details
            thumb-size="10px"
            track-size="1px"
          >
            <template v-slot:prepend>
              <v-text-field
                v-model="range[0]"
                density="compact"
                style="width: 20px"
                variant="plain"
                hide-details
                single-line
                :readonly="true"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                v-model="range[1]"
                density="compact"
                style="width: 20px"
                variant="plain"
                hide-details
                single-line
                :readonly="true"
              ></v-text-field>
            </template>
          </v-range-slider>
        </div>
      </div>

      <div>
        <h2>{{ $t('oil') }}</h2>

        <div class="sidebar__content">
          <label v-for="(oil, i) in oils" :key="oil">
            <input
              @change="() => onChangeOil(checkedOil)"
              type="checkbox"
              :value="i + 1"
              v-model="checkedOil"
            />
            {{ oil }}
          </label>
        </div>
      </div>

      <div>
        <h2>{{ $t('color') }}</h2>

        <div class="sidebar__content">
          <label v-for="(color, i) in colors" :key="color">
            <input
              @change="() => onChangeColor(checkedColors)"
              type="checkbox"
              :value="i + 1"
              v-model="checkedColors"
            />
            {{ color }}
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@use '../scss/util/index' as u;

@media (min-width: 49.98em) {
  aside {
    min-width: u.rem(180);
  }

  aside,
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 2rem;

    .sidebar {
      top: u.rem(10);
      position: relative;
      overflow-y: scroll;
      max-height: 70vh;

      h2 {
        margin-bottom: 0.5rem;
        border-bottom: u.rem(1) solid var(--clr-secondary-500);
        padding-bottom: 0.5rem;
      }
      &__content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        input {
          cursor: pointer;
        }
      }
    }
  }
}

.close {
  display: none;

  @media (max-width: 49.98em) {
    display: block;
    position: absolute;
    height: u.rem(18);
    right: u.rem(10);
    top: u.rem(10);
  }
}

@media (max-width: 49.98em) {
  aside {
    display: none;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    border: 1px solid #000;
    padding: 2rem;
    top: 5rem;
    left: 0;
    right: 0;
    max-height: u.rem(550);
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

    h3 {
      text-align: center;
      margin-bottom: 1rem;
    }

    .sidebar {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;

      &__content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        min-width: u.rem(130);
      }
    }
  }
}
</style>
