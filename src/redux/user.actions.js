import { userTypes } from './user.type';
import { userService } from './../services/user.service';
import { alertActions } from './alert.actions';
import { history } from './../helpers/history';
import { checkServices } from './../services/check.service';

export const userActions = {
    login,
    logout,
    register,
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
                    window.location.reload()

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
                    window.location.reload()
                }
            );
    };

    function request(user) { return { type: userTypes.REGISTER_REQUEST, user } }
    function success(user) { return { type: userTypes.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userTypes.REGISTER_FAILURE, error } }
}