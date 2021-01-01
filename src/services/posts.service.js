import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';
import {uploadImageService} from './uploadImage.service'

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

function postFeed(body) {
    const requestOptions = {
        method: 'POST',
        body :  body,
        headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    return uploadImageService.uploadImage(body.posts.image)
    .then(function(res){
        if(res){
            console.log(res[0].url)
            body.posts.image = res[0].url
        }
        requestOptions.body = JSON.stringify(body)
        console.log(requestOptions)
        return fetch(`${baseUrl}/posts/`, requestOptions)
    }).then(getAllFeed);
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