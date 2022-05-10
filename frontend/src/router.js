import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import TicTacToe from "./components/TicTacToe";
import Account from "@/components/Account";
import Change_password from "@/components/Change_password";
import Users from "@/components/Users";
import Stats from "@/components/Stats";
import Ranking from "@/components/Ranking";
import Register from "./components/Register.vue";
import Register_confirm from "@/components/Register_confirm";
import Friends from "@/components/Friends";
import Friend_invitation from "@/components/Friend_invitation";
import Game_invitation from "@/components/Game_invitation";
import Game_session from "@/components/Game_session";
import Lobby from "@/components/Lobby";

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
        path: '/confirm',
        component: Register_confirm,
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
        path: "/changePassword",
        component: Change_password,
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
    {
        path: "/friends",
        component: Friends,
    },
    {
        path: "/friendInvitation",
        component: Friend_invitation,
    },
    {
        path: "/gameInvitation",
        component: Game_invitation,
    },
    {
        path: "/gameSession",
        component: Game_session,
    },
    {
        path: "/lobby",
        component: Lobby,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;