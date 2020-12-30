import { userTypes } from './../type/user.type';
import { userService } from './../../services/user.service';
import { alertActions } from './alert.actions';
import { history } from './../../utils/history';

export const userActions = {
    login,
    logout,
    register,
    changeImage,
    updateUser,
    getUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    // history.push('/login');
                    //window.location.reload()

                }
            );
    };

    function request(user) { return { type: userTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userTypes.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userTypes.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };

    function request(user) { return { type: userTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: userTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userTypes.REGISTER_FAILURE, error } }
}
function getUser(user) {
    return dispatch => {
        dispatch(request(user));

        userService.getUser(user)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/login');
                    dispatch(alertActions.success('Get User Succesfull'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };

    function request(user) { return { type: userTypes.GETUSER_REQUEST, user } }
    function success(user) { return { type: userTypes.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userTypes.GETUSER_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {
        dispatch(request(user));
        dispatch(requestLogin( user ));


        userService.updateUser(user)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(successLogin(user));
                    // history.push('/login');
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(failureLogin(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };

    function request(user) { return { type: userTypes.UPDATE_REQUEST, user } }
    function success(user) { return { type: userTypes.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userTypes.UPDATE_FAILURE, error } }
    function requestLogin(user) { return { type: userTypes.LOGIN_REQUEST, user } }
    function successLogin(user) { return { type: userTypes.LOGIN_SUCCESS, user } }
    function failureLogin(error) { return { type: userTypes.LOGIN_FAILURE, error } }
}

function changeImage(file){
    return dispatch => {
        dispatch(request(file));

        userService.changeImage(file)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/login');
                    dispatch(alertActions.success('Change successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };

    function request(user) { return { type: userTypes.PROFILECHANGE_REQUEST, user } }
    function success(user) { return { type: userTypes.PROFILECHANGE_SUCCESS, user } }
    function failure(error) { return { type: userTypes.PROFILECHANGE_FAILURE, error } }
}