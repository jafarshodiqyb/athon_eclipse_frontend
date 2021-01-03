import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import {handleResponse} from './../utils/handleResponse'
import { uploadImageService } from './uploadImage.service';

export const userService = {
    login,
    logout,
    register,
    changeImage,
    updateUser,
    getUser,
    refreshToken,
    changePassword    
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
function refreshToken(user){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
    };

    return fetch(`${baseUrl}/users/refresh-token/${user}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.removeItem("token");
            localStorage.setItem('token', JSON.stringify(user.token));

            return user;
        });
}
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/users/register`, requestOptions).then(handleResponse);
}
function getUser(user){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    
    return fetch(`${baseUrl}/users/${user}`, requestOptions).then(handleResponse);
      
}

async function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: user
    };
    if (typeof user.image == 'object'){
        const formData = new FormData();
        formData.append("file", user.image);    
        const upload = await  uploadImageService.uploadImage(formData)
        user.image = upload[0].url;
    }
        requestOptions.body = JSON.stringify(user);
    return fetch(`${baseUrl}/users/update-user`, requestOptions)
        .then(handleResponse)
        .then(data=>{
            return refreshToken(data.username)
        })
}

function changeImage(file){
    const requestOptions = {
        method: 'POST',
        body: file,
        // headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    
    return fetch(`${baseUrl}/image-upload`, requestOptions).then(handleResponse);
      
}

function changePassword(body){
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    
    return fetch(`${baseUrl}/users/changepassword`, requestOptions).then(handleResponse);
      
}