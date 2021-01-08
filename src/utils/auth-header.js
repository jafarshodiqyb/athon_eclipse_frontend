export function authHeader() {
    let token = JSON.parse(localStorage.getItem('token')||null);

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}