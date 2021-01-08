import { baseUrl } from '../utils/baseURL';
import { handleResponse } from './../utils/handleResponse';

export const uploadImageService = {
    uploadImage, 
};

function uploadImage(file){
    const requestOptions = {
        method: 'POST',
        body: file,

    };
    
    return fetch(`${baseUrl}/image-upload`, requestOptions).then(handleResponse);
      
}