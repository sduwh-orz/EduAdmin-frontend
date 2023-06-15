import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.scss'

import * as ElementPlusIconVue from '@element-plus/icons-vue'

import axios from 'axios'

import '@/assets/fonts/fonts.css'
import '@/assets/iconfont/iconfont.css'

axios.defaults.withCredentials = true

const app = createApp(App)
app.use(ElementPlus)

app.config.globalProperties.$axios = axios

for (const [key, component] of Object.entries(ElementPlusIconVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')
