import { checkTypes } from './../type/check.type';
import { checkServices } from '../../services/check.service';
import { alertActions } from './alert.actions';
import { history } from '../../utils/history';
import { dispatchSelector } from '../../utils/dispatchSelector';

export const checkActions = {
    checkin,
    getCheckin,
    checkout
};


function checkin(user) {
    return dispatch => {
        dispatch(dispatchSelector.request(user,checkTypes.CHECKIN_REQUEST));
        checkServices.checkin(user)
            .then(
                user => { 
                    dispatch(dispatchSelector.success(user, checkTypes.CHECKIN_SUCCESS));
                    dispatch(alertActions.success('Checkin successful'));

                },
                error => {
                    dispatch(dispatchSelector.failure(error,checkTypes.CHECKIN_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function getCheckin(id) {
    return dispatch => {
        dispatch(dispatchSelector.request(id,checkTypes.GETCHECKIN_REQUEST));

        checkServices.getCheckin(id)
            .then(
                users => dispatch(dispatchSelector.success(users,checkTypes.GETCHECKIN_SUCCESS)),
                error => dispatch(dispatchSelector.failure(error,checkTypes.GETCHECKIN_FAILURE))

            );
    };
}

function checkout(user) {
    return dispatch => {
        dispatch(dispatchSelector.request(user,checkTypes.CHECKOUT_REQUEST));

        checkServices.checkout(user)
            .then(
                users => dispatch(dispatchSelector.success(users,checkTypes.CHECKOUT_SUCCESS)),
                error => dispatch(dispatchSelector.failure(error,checkTypes.CHECKOUT_FAILURE))

            );
    };

}