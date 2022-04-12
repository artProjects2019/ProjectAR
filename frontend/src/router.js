import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import TicTacToe from "./components/TicTacToe";
import Account from "@/components/Account";
import Friends from "@/components/Friends";
import Users from "@/components/Users";
import Stats from "@/components/Stats";
import Ranking from "@/components/Ranking";
import Register_confirm from "@/components/Register_confirm";

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
        children: [
            {
                path: '/register/confirm',
                component: Register_confirm,
                children: [
                    {
                        path: '/register/confirm/**',
                        component: Register_confirm
                    }
                ]
            },
        ]
    },
    {
        path: "/ticTacToe",
        component: TicTacToe,
    },
    {
        path: "/account",
        component: Account,
    },
    {
        path: "/friends",
        component: Friends,
    },
    {
        path: "/users",
        component: Users,
    },
    {
        path: "/ranking",
        component: Ranking,
    },
    {
        path: "/stats",
        component: Stats,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;