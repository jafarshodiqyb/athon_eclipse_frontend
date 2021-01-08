import { authHeader } from '../utils/auth-header';
import { baseUrl } from '../utils/baseURL';
import { handleResponse } from './../utils/handleResponse';

export const checkServices = {
    checkin,
    getCheckin,
    checkout
};




function checkin(id) {
    let userTemp = {user : id}
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(userTemp)
    };

    return fetch(`${baseUrl}/check/checkin`, requestOptions).then(handleResponse);
}

function getCheckin(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${baseUrl}/check/checkin/${id}`, requestOptions).then(handleResponse);
}


function checkout(id) {
    let userTemp = {user : id}
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(userTemp)
    };

    return fetch(`${baseUrl}/check/checkout`, requestOptions).then(handleResponse);
}