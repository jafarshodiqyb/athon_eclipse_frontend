import {baseUrl} from '../helpers/baseURL'
import { authHeader } from '../helpers/auth-header';
import { userService } from './user.service';

export const activityService = {
    addActivity,
    updateActivity,
    deleteActivity
};

function addActivity(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(handleResponse);
}

function updateActivity(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteActivity(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload();

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}