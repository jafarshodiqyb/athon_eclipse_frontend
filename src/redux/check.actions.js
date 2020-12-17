import { checkTypes } from './check.type';
import { checkServices } from '../services/check.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';

export const checkActions = {
    checkin,
    getCheckin,
    checkout
};


function checkin(user) {
    return dispatch => {
        dispatch(request(user));

        checkServices.checkin(user)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success('Checkin successful'));
                    window.location.reload()

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    window.location.reload()
                }
            );
    };

    function request(user) { return { type: checkTypes.CHECKIN_REQUEST, user } }
    function success(user) { return { type: checkTypes.CHECKIN_SUCCESS, user } }
    function failure(error) { return { type: checkTypes.CHECKIN_FAILURE, error } }
}

function getCheckin(id) {
    return dispatch => {
        dispatch(request());

        checkServices.getCheckin(id)
            .then(
                users => {dispatch(success(users))},
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: checkTypes.GETCHECKIN_REQUEST } }
    function success(users) { return { type: checkTypes.GETCHECKIN_SUCCESS, users } }
    function failure(error) { return { type: checkTypes.GETCHECKIN_FAILURE, error } }
}

function checkout(user) {
    return dispatch => {
        dispatch(request(user));

        checkServices.checkout(user)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch(alertActions.success('Checkout successful'));
                    // history.push('/home');
                    window.location.reload()
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    window.location.reload()
                }
            );
    };

    function request(user) { return { type: checkTypes.CHECKOUT_REQUEST, user } }
    function success(user) { return { type: checkTypes.CHECKOUT_SUCCESS, user } }
    function failure(error) { return { type: checkTypes.CHECKOUT_FAILURE, error } }
}