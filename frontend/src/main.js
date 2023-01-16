import { createApp } from 'vue';
import app_using from './app_using';

import 'vfonts/Lato.css';

import App from './App.vue';
const app = createApp(App)

app_using(app);

app.mount("#app");