import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handle-response';
import http from '../services/http-client';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
    get accessToken() {
        return localStorage.getItem('accessToken');
    },
};

function login(username, password) {
    var data = {
        emailId: username,
        password: password,
        grantType: 'Password',
        refreshToken: '',
    };

    return http.post('/Auth/Token', data).then((response) => {
        var token = response.data;
        localStorage.setItem('accessToken', token.accessToken);
        localStorage.setItem('refreshToken', token.refreshToken);
        localStorage.setItem('tokenExpiresAt', token.expiresAt);
        currentUserSubject.next(token);

        return token;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    currentUserSubject.next(null);
}

function register(registerDetails) {
    return http.post(`/User/Register`, registerDetails).then((response) => {
        return response.data;
    });
}
