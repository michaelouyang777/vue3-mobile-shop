import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './extension/router'
import store from './extension/store'

createApp(App).use(store).use(router).mount('#app');
