import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './extension/router'
import store from './extension/store'
import axios from './common/axios'

console.log('%c 🍭 axios: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', axios);
const app = createApp(App);
app.config.globalProperties.$http = axios;
console.log('%c 🥜 app: ', 'font-size:20px;background-color: #B03734;color:#fff;', app);

app.use(store)
  .use(router)
  .mount('#app');
