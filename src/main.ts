import { createApp } from 'vue'
import {pinia} from '@/stores'
import '@/style.css'
import App from '@/App.vue'
import {router} from "@/router";
import Toast from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'vue-loading-overlay/dist/css/index.css'


const app = createApp(App)

const options: PluginOptions = {
  // You can set your default options here
};

app.use(Toast, options);

app.use(router)
app.use(pinia)
app.mount('#app')
