export const dispatchSelector = {
    request,
    success,
    failure
};

function request(user,type) { return { type: type, user } }
function success(user,type) { return { type: type, user } }
function failure(error,type) { return { type: type, error } }
