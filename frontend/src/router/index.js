import { createRouter, createWebHistory } from "vue-router";

//pages
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";

import article_multi from "../views/pages/Article/Multiple.vue";
import article_single from "../views/pages/Article/Single.vue";
import article_edit from "../views/pages/Article/Edit.vue";

import error_404 from "../views/pages/404.vue";
//todo: error_400 (permission deined)

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},

    {path: "/articles", component: article_multi},
    {path: "/article/:id", component: article_single},
    {path: "/article/:id/:action(edit|create)", component: article_edit},
    
    {path: "/:pathMatch(.*)*", component: error_404}
];

//make router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;