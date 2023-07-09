import {createRouter, createWebHistory} from 'vue-router';

const pageModules = import.meta.glob('../views/**/page.js', {
    eager: true,
    import: 'default',
});

const compModules = import.meta.glob('../views/**/index.vue');

const routes = Object.entries(pageModules).map(([pagePath, config]) => {
    let path = pagePath.replace('../views', '').replace('/page.js', '');
    path = path || '/';
    const name = path.split('/').filter(Boolean).join('-') || 'index';
    const compPath = pagePath.replace('page.js', 'index.vue');
    return {
        name: name,
        path: path,
        component: compModules[compPath],
        meta: config,
    };
});

export default createRouter({
    history: createWebHistory(),
    routes,
});