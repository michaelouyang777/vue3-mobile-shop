import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './extension/router'
import store from './extension/store'

import axios from './common/axios'
console.log('%c 🍭 axios: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', axios);

const vm = createApp(App).use(store).use(router).mount('#app')