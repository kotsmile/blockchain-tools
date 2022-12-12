import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setActivePinia } from 'evm-ext-vue3'

import App from './App.vue'

import './assets/base.css'

const app = createApp(App)

const pinia = createPinia()
setActivePinia(pinia)

app.use(pinia)

app.mount('#app')
