import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
    {
        path: "/login",
        name: 'login',
        component: () => import("./views/Login/index.vue"),
    },
    {
        path: "/search",
        name: 'search',
        component: () => import("./views/Search/index.vue"),
    },
    {
        path: "/",
        redirect: "/login",
    },
];

// 路由器
const router = createRouter({
    history: createWebHistory(), // HTML5模式
    routes,
});

export default router;