import { createApp } from 'vue'
import naive from "naive-ui"

import 'vfonts/Lato.css'

import VueApp from './views/origin.vue'

const app = createApp(VueApp)
app.use(naive);
app.mount("#app");