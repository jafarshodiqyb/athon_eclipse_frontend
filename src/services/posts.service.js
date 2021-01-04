import { authHeader } from '../utils/auth-header';
import { baseUrl } from '../utils/baseURL';
import { handleResponse } from './../utils/handleResponse';
import { uploadImageService } from './uploadImage.service';

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
