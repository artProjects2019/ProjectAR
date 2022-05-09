import axios from 'axios';
class AuthService {
    login(user) {
        return axios.post('api/login', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post('api/register', {
            username: user.username,
            password: user.password,
            email: user.email,
        });
    }
    confirm(token) {
        return axios.get('api/register/confirm?token=' + token.token, {
        });
    }
    newPassword(user) {
        return axios.post('api/changePassword', {
            username: user.username,
            password: user.password,
        })
    }
    invite(invitation) {
        return axios.post('api/friends/invite', {
            senderUsername: invitation.sender,
            receiverUsername: invitation.receiver,
        })
    }
    gameAccept(acceptation) {
        return axios.post('api/games/sessions/accept', {
            receiverUsername: acceptation.receiver,
            sessionKey: acceptation.key,
        })
    }
    gameDecline(rejection) {
        return axios.post('api/games/sessions/decline', {
            sessionKey: rejection.key,
        })
    }
    accept(acceptation) {
        return axios.post('api/friends/accept', {
            senderUsername: acceptation.sender,
            receiverUsername: acceptation.receiver,
        })
    }
    decline(rejection) {
        return axios.post('api/friends/decline', {
            senderUsername: rejection.sender,
            receiverUsername: rejection.receiver,
        })
    }
    sessionCreate(session) {
        return axios.post('api/games/sessions/create', {
            firstUser: session.firstUser,
            secondUser: session.secondUser,
            key: session.key,
        })
    }
    sessionClose(session){
        return axios.delete('api/games/sessions/close', {
            key: session.key,
        })
    }
}
export default new AuthService();