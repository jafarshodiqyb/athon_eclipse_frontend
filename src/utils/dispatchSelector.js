export const dispatchSelector = {
    request,
    success,
    failure
};

function request(user,type) { return { type: type } }
function success(payload,type) { return { type: type, payload } }
function failure(error,type) { return { type: type, error } }
