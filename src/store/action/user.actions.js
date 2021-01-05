import { dispatchSelector } from '../../utils/dispatchSelector';
import { userService } from './../../services/user.service';
import { history } from './../../utils/history';
import { userTypes } from './../type/user.type';
import { alertActions } from './alert.actions';

export const userActions = {
    login,
    logout,
    register,
    changeImage,
    updateUser,
    getUser,
    changePassword,
    setPassword
};

function login(username, password) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(username,userTypes.LOGIN_REQUEST));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(dispatchSelector.success(user, userTypes.LOGIN_SUCCESS));
                    history.push('/');
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.LOGIN_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                    // history.push('/login');
                    //window.location.reload()

                }
            );
    };
}

function logout() {
    userService.logout();
    return { type: userTypes.LOGOUT };
}

function register(user) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(user,userTypes.REGISTER_REQUEST));
        userService.register(user)
            .then(
                user => {
                    dispatch(dispatchSelector.success(user, userTypes.REGISTER_SUCCESS)); 
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.REGISTER_SUCCESS)); 
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}
function getUser(user) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(user,userTypes.GETUSER_REQUEST));
        userService.getUser(user)
            .then(
                user => { 
                    dispatch(dispatchSelector.success(user, userTypes.GETUSER_SUCCESS)); 
                    // history.push('/login');
                    dispatch(alertActions.success('Get User Succesfull'));
                },
                error => {
                    dispatch(dispatchSelector.error(user, userTypes.GETUSER_FAILURE)); 
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}

function updateUser(user) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(user,userTypes.UPDATE_REQUEST));
        dispatch(dispatchSelector.request(user,userTypes.LOGIN_REQUEST));
        userService.updateUser(user)
            .then(
                user => {
                    dispatch(dispatchSelector.success(user, userTypes.UPDATE_SUCCESS));  
                    dispatch(dispatchSelector.success(user, userTypes.LOGIN_SUCCESS));  
                    // history.push('/login');
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.UPDATE_FAILURE));  
                    dispatch(dispatchSelector.failure(error, userTypes.LOGIN_FAILURE));  
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}

function changeImage(file){
    return dispatch => {                    
        dispatch(dispatchSelector.request(file,userTypes.PROFILECHANGE_REQUEST));
        userService.changeImage(file)
            .then(
                user => { 
                    // history.push('/login');
                    dispatch(dispatchSelector.success(user, userTypes.PROFILECHANGE_SUCCESS));  
                    dispatch(alertActions.success('Image uploaded'));
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.PROFILECHANGE_SUCCESS));  
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}

function changePassword(body){
    return dispatch => {                    
        dispatch(dispatchSelector.request(body,userTypes.CHANGEPASSWORD_REQUEST));
        userService.changePassword(body)
            .then(
                user => { 
                    // history.push('/login');
                    dispatch(dispatchSelector.success(user, userTypes.CHANGEPASSWORD_SUCCESS));  
                    dispatch(alertActions.success(user.message));
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.CHANGEPASSWORD_FAILURE));  
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}

function setPassword(body){
    return dispatch => {                    
        dispatch(dispatchSelector.request(body,userTypes.SETPASSWORD_REQUEST));
        dispatch(dispatchSelector.request(body,userTypes.LOGIN_REQUEST));
        userService.setPassword(body)
            .then(
                user => { 
                    // history.push('/login');
                    console.log(user)
                    dispatch(dispatchSelector.success(user, userTypes.SETPASSWORD_SUCCESS));  
                    dispatch(dispatchSelector.success(user, userTypes.LOGIN_SUCCESS)); 
                    dispatch(alertActions.success('Your password has been set successfully'));
                },
                error => {
                    dispatch(dispatchSelector.failure(error, userTypes.SETPASSWORD_FAILURE));  
                    dispatch(dispatchSelector.failure(error, userTypes.LOGIN_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                    //window.location.reload()
                }
            );
    };
}