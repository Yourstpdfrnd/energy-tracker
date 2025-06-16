import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './assets/styles/main.scss'
import ElementPlus from './plugins/element-plus'

createApp(App).use(router).use(i18n).use(ElementPlus).use(createPinia()).mount('#app')