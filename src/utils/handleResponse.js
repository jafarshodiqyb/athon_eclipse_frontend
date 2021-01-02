import { userService } from "../services/user.service";

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                //window.location.reload();

            }

            const error = (data &&  data.message) || data.err.message || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}