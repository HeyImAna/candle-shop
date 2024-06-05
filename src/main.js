import './assets/main.css'
import './scss/style.scss'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

// i18n
import { createI18n } from 'vue-i18n'
import EN from '../src/locale/en.json'
import RU from '../src/locale/ru.json'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import ToastService from 'primevue/toastservice'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import Home from './pages/Home.vue'
import Details from './pages/Details.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'
import NotFound from './pages/NotFound.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/details/:id', name: 'details', component: Details }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

const vuetify = createVuetify({
  components,
  directives
})

const i18n = createI18n({
  legacy: false,
  locale: document.cookie.split('=')[1],
  messages: {
    EN: EN,
    RU: RU
  }
})

app.use(router)
app.use(autoAnimatePlugin)
app.use(vuetify)
app.use(i18n)
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
