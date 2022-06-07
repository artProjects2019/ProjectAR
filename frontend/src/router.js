import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/pages/Home.vue";
import Login from "./components/pages/Login.vue";
import TicTacToe from "./components/games/TicTacToe";
import Account from "@/components/pages/account/Account";
import Change_password from "@/components/pages/Change_password";
import Users from "@/components/pages/Users";
import Ranking from "@/components/pages/Ranking";
import Register from "./components/pages/register/Register.vue";
import Register_confirm from "@/components/pages/register/Register_confirm";
import Friends from "@/components/pages/Friends";
import Friend_invitation from "@/components/pages/Friend_invitation";
import Game_invitation from "@/components/pages/Game_invitation";
import Game_session from "@/components/pages/Game_session";
import Lobby from "@/components/pages/Lobby";
import ConnectFour from "@/components/games/ConnectFour";
import Memory from "@/components/games/Memory";

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
        path: "/connectFour",
        component: ConnectFour,
    },
    {
        path: "/memory",
        component: Memory,
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