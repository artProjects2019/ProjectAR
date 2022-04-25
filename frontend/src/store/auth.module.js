import AuthService from '../services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error.response.data);
                }
            );
        },
        confirm({ commit }, token) {
            return AuthService.confirm(token).then(
                response => {
                    commit('confirmationSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('confirmationFailure');
                    return Promise.reject(error.response.data);
                }
            );
        },
        addFriend({ commit }, user) {
            return AuthService.addFriend(user).then(
                response => {
                    commit('additionSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('additionFailure');
                    return Promise.reject(error.response.data);
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            console.log("Logged in");
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            console.log("Login failure")
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        additionSuccess(state) {
            console.log("Addition success");
            state.status.friends = true;
        },
        additionFailure(state) {
            console.log("Addition failure");
            state.status.friends = false;
        }
    }
};