import {baseUrl} from '../utils/baseURL'
import { authHeader } from '../utils/auth-header';

export const uploadImageService = {
    uploadImage, 
};

function uploadImage(file){
    const requestOptions = {
        method: 'POST',
        body: file,
        // headers: { ...authHeader(),'Content-Type': 'application/json' },

    };
    
    return fetch(`${baseUrl}/image-upload`, requestOptions).then(handleResponse);
      
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                //window.location.reload();
                // location.reload(true);
            }
            
            const error = (data &&  data.message) || data.err.message || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}