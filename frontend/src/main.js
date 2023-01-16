import { createApp } from 'vue';

import router from "./router/index";
import naive from "naive-ui";
import vro from "vue-resize-observer";

import 'vfonts/Lato.css';

import App from './App.vue';
const app = createApp(App)

app.use(router);
app.use(naive);
app.use(vro);
app.mount("#app");