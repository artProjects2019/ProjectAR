import axios from 'axios';
const API_URL = 'http://localhost:8080/';
class AuthService {
    login(user) {
        return axios.post(API_URL + 'authenticate', {
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
        return axios.post(API_URL + 'register', {
            username: user.username,
            password: user.password,
            email: user.email,
        });
    }
}
export default new AuthService();