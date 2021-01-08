import { authHeader } from '../utils/auth-header';
import { baseUrl } from '../utils/baseURL';
import { handleResponse } from '../utils/handleResponse';
import { uploadImageService } from './uploadImage.service';

export const storiesService = {
    getAllStories,
    postStories
};




function getAllStories() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };

    return fetch(`${baseUrl}/stories/`, requestOptions).then(handleResponse);
}

async function postStories(body) {
    const requestOptions = {
        method: 'POST',
        body :  body,
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    if (typeof body.stories.image == 'object'){
        const formData = new FormData();
        formData.append("file", body.stories.image);    
        const upload = await  uploadImageService.uploadImage(formData)
        body.stories.url = upload[0].url;
    }
        requestOptions.body = JSON.stringify(body);
    return fetch(`${baseUrl}/stories/`, requestOptions).then(getAllStories);
    }