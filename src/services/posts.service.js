import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import {uploadImageService} from './uploadImage.service'
import { filter } from 'lodash';

export const postsService = {
    getAllFeed,
    postFeed
};




function getAllFeed() {
    const requestOptions = {
        method: 'GET',
        // headers: authHeader()
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };

    return fetch(`${baseUrl}/posts/`, requestOptions).then(handleResponse);
}

async function postFeed(body) {
    const requestOptions = {
        method: 'POST',
        body :  body,
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    if (typeof body.posts.image == 'object'){
        const upload = await  uploadImageService.uploadImage(body.posts.image)
        body.posts.image = upload[0].url;
    }
        requestOptions.body = JSON.stringify(body);
        return fetch(`${baseUrl}/posts/`, requestOptions).then(getAllFeed);
    }




function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // userService.logout();
                //window.location.reload();
                
                // location.reload(true);
            }

            const error = (data &&  data.message) || data.err.message || response.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}