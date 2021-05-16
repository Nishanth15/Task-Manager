import { BehaviorSubject } from 'rxjs';
// import config from 'config';
import { handleResponse } from '../helpers/handle-response';


const url = "https://localhost:44373/api/";
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    get accessToken(){return localStorage.getItem('accessToken')}
};

function login(username, password) {
    var data = {
        "emailId": username,
        "password": password,
        "grantType": 'Password',
        "refreshToken": ''
      }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${url}Auth/Token`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);
            localStorage.setItem('tokenExpiresAt', token.expiresAt)
            currentUserSubject.next(token);

            return token;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    currentUserSubject.next(null);
}

function register(registerDetails){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerDetails)
    };

    return fetch(`${url}User/Register`, requestOptions)
        .then(handleResponse)
        .then(response =>{
            return response;
        });
}