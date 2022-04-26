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
    invite(invitation) {
        return axios.post('api/friends/invite', {
            senderUsername: invitation.sender,
            receiverUsername: invitation.receiver,
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
}
export default new AuthService();