import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa o router
import axios from 'axios';
import VueGtm from 'vue-gtm';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/global.css';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3000/api';
app.config.globalProperties.$axios = axios;

app.use(VueGtm, {
  id: 'GTM-MMW7P4NQ',
  enabled: true,
  debug: false,
  vueRouter: router
});

app.use(router); // Use o router na instância do Vue
app.mount('#app');
