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
    invite(user,user2) {
        return axios.post('api/friends/invite', {
            senderUsername: user.username,
            receiverUsername: user2.username,
        })
    }
}
export default new AuthService();