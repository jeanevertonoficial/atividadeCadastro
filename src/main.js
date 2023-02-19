import {VueMaskFilter} from "v-mask";
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueTheMasck from 'vue-the-mask';

createApp(App)
    .use(router)
    .use(VueTheMasck)
    .use(VueMaskFilter)
    .mount('#app');
