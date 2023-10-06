import { createApp } from 'vue';
import { router } from './core/routes/routes.ts';
import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.mount('#app');
