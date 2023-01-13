import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import NotFound from "../views/pages/404.vue";

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/:pathMatch(.*)*", component: NotFound},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;