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
        newPassword({ commit }, user) {
            return AuthService.newPassword(user).then(
                user => {
                    commit('newPasswordSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('newPasswordFailure');
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
        invite({ commit }, invitation) {
            return AuthService.invite(invitation).then(
                response => {
                    commit('invitationSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('invitationFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        accept({ commit }, acceptation) {
            return AuthService.accept(acceptation).then(
                response => {
                    commit('acceptationSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('acceptationFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        decline({ commit }, rejection) {
            return AuthService.decline(rejection).then(
                response => {
                    commit('rejectionSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('rejectionFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        gameAccept({ commit }, acceptation) {
            return AuthService.gameAccept(acceptation).then(
                response => {
                    commit('acceptationSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('acceptationFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        gameDecline({ commit }, rejection) {
            return AuthService.gameDecline(rejection).then(
                response => {
                    commit('rejectionSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('rejectionFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        sessionCreate({ commit }, session) {
            return AuthService.sessionCreate(session).then(
                response => {
                    commit('sessionSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('sessionFailure');
                    return Promise.reject(error.response.data);
                }
            )
        },
        sessionClose({ commit }, session) {
            return AuthService.sessionClose(session).then(
                response => {
                    commit('sessionSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('sessionFailure');
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
        invitationSuccess(state) {
            console.log("Invitation success");
            state.status.invited = true;
        },
        invitationFailure(state) {
            console.log("Invitation failure");
            state.status.invited = false;
        },
        acceptationSuccess(state) {
            console.log("Acceptation success");
            state.status.invited = false;
            state.status.accepted = true;
        },
        acceptationFailure(state) {
            console.log("Acceptation failure");
            state.status.invited = false;
            state.status.accepted = false;
        },
        rejectionSuccess(state) {
            console.log("Rejection success");
            state.status.invited = false;
            state.status.accepted = false;
            state.status.rejected = true;
        },
        rejectionFailure(state) {
            console.log("Rejection failure");
            state.status.invited = false;
            state.status.accepted = true;
            state.status.rejected = false;
        },
        newPasswordSuccess() {
            console.log("Password has been changed");
        },
        newPasswordFailure() {
            console.log("Password change failure");
        }
    }
};