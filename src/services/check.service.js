import {baseUrl} from '../helpers/baseURL'
import { authHeader } from '../helpers/auth-header';
import {userService} from './user.service'
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

    return fetch(`${baseUrl}/check/checkin`, requestOptions).then(userService.handleResponse);
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

    return fetch(`${baseUrl}/check/checkout`, requestOptions).then(userService.handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}