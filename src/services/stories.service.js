import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import {userService} from './user.service'
export const storiesService = {
    getAllStories
};




function getAllStories() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${baseUrl}/stories/`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                //window.location.reload();
                
                // location.reload(true);
            }

            const error = (data &&  data.message) || data.err.message || response.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}