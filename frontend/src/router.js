import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import TicTacToe from "./components/TicTacToe";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/TicTacToe",
        component: TicTacToe,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;