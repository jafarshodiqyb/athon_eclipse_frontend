import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import { userService } from './user.service';
import { handleResponse } from '../utils/handleResponse';
import { checkServices } from './check.service';

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

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(checkServices.getCheckin(data.username)).then(handleResponse);
}

function updateActivity(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(checkServices.getCheckin(user.username)).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteActivity(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(checkServices.getCheckin(id.username)).then(handleResponse);
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 userService.logout();
//                 //window.location.reload();

//             }

//             const error = (data &&  data.message) || data.err.message || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }