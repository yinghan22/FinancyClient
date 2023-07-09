import {createApp} from 'vue';
import './style.css';
import App from './App.vue';


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import store from './store';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// axios.withCredentials = true;

createApp(App)
    .use(ElementPlus, {locale: zhCn})
    .use(router)
    .use(store)
    .mount('#app');
