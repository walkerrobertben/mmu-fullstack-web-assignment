import { createRouter, createWebHistory } from "vue-router";

import { auth_service } from "../services/auth.service";
import { article_service } from "../services/article.service";

//pages
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";

import article_multi from "../views/pages/Article/Multiple.vue";
import article_single from "../views/pages/Article/Single.vue";
import article_edit from "../views/pages/Article/Edit.vue";

import users from "../views/pages/Users.vue";

import error_400 from "../views/pages/400.vue";
import error_404 from "../views/pages/404.vue";

//generic auth requirement
const require_user_level = (required) => {
    return (to, from) => {
        if (auth_service.getUserLevel() >= required) {
            return true;
        } else {
            return "/denied";
        }
    }
}

//redirect everything to path
const redirects = (path) => {
    return (to, from) => {
        if (to.fullPath !== path) {
            return {
                path: path,
                replace: true
            }
        }
    }
}

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},

    {path: "/articles", component: article_multi},
    {path: "/article/:id(\\d+)", component: article_single},
    {path: "/article/:id(\\d+)/:action(edit|create)", component: article_edit},

    {path: "/users", component: users, beforeEnter: require_user_level(auth_service.USER_LEVELS.LEVEL_ADMIN)},
    
    {path: "/denied", component: error_400},
    {path: "/:pathMatch(.*)*", component: error_404, beforeEnter: redirects("/404")},
];

//make router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;