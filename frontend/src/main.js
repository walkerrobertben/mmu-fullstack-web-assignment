import { createApp } from 'vue';

import router from "./router/index";
import naive from "naive-ui";

import 'vfonts/Lato.css';

import App from './views/App.vue';
const app = createApp(App)

app.use(router);
app.use(naive);

app.mount("#app");