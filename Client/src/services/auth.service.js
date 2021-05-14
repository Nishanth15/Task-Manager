import { BehaviorSubject } from 'rxjs';

// import config from 'config';
import { handleResponse } from '../helpers/handle-response';


const url = "https://localhost:44373/api/";
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const utcDate = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
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
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}