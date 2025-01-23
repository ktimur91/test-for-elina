import 'ant-design-vue/dist/reset.css'
import './assets/main.css'

// NPM
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Local
import App from './App.vue'
import router from './router'

// Create app
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
