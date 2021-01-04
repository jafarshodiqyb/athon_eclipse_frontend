import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
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

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(handleResponse);
}

function updateActivity(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(checkServices.getCheckin(user.username)).then(handleResponse);;
}

function deleteActivity(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    };

    return fetch(`${baseUrl}/check/activity`, requestOptions).then(checkServices.getCheckin(id.username)).then(handleResponse);
}