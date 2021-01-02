import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import {handleResponse} from './../utils/handleResponse'

export const checkServices = {
    checkin,
    getCheckin,
    checkout
};




function checkin(user) {
    let userTemp = {username : user}
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(userTemp)
    };

    return fetch(`${baseUrl}/check/checkin`, requestOptions).then(handleResponse);
}

function getCheckin(user) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${baseUrl}/check/checkin/${user}`, requestOptions).then(handleResponse);
}


function checkout(user) {
    let userTemp = {username : user}
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(userTemp)
    };

    return fetch(`${baseUrl}/check/checkout`, requestOptions).then(handleResponse);
}