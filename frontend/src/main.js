import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import store from "./store/index.js";
import router from "./router/index.js";

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
