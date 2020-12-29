import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';

export const userService = {
    login,
    logout,
    register,
    changeImage,
    updateUser    
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(user.token));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/users/register`, requestOptions).then(handleResponse);
}

function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/users/update-user`, requestOptions).then(handleResponse);
}

function changeImage(file){
    const requestOptions = {
        method: 'POST',
        body: file,
        // headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    
    return fetch(`${baseUrl}/image-upload`, requestOptions).then(handleResponse);
      
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //window.location.reload();
                // location.reload(true);
            }
            
            const error = (data &&  data.message) || data.err.message || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}