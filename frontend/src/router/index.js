import { createRouter, createWebHistory } from "vue-router";

//pages
import Home from "../views/pages/Home.vue";
import Articles from "../views/pages/Articles.vue";
import Login from "../views/pages/Login.vue";
const routes = [
    {path: "/", component: Home},
    {path: "/articles", component: Articles},
    {path: "/login", component: Login},
];

//404
import NotFound from "../views/pages/404.vue";
routes.push({path: "/:pathMatch(.*)*", component: NotFound})

//make router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;