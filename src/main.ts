import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';

import 'vue-color/style.css';
import "dashvar/dist/dashvar.css";
import { tooltip } from '@ionited/tooltip-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia)
app.directive('tooltip', tooltip);
app.mount('#app')
