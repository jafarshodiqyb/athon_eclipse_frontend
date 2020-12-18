import { checkTypes } from './check.type';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import { activityService } from '../services/activity.service';
import { activityTypes } from './activity.type';

export const activityActions= {
    addActivity,
    deleteActivity,
    updateActivity
};


function addActivity(data) {
    return dispatch => {
        dispatch(request(data));

        activityService.addActivity(data)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(alertActions.success('Add activity successful'));
                    // history.push('/');
                    //window.location.reload()

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: activityTypes.ACTIVITY_REQUEST, user } }
    function success(user) { return { type: activityTypes.ACTIVITY_SUCCESS, user } }
    function failure(error) { return { type: activityTypes.ACTIVITY_FAILURE, error } }
}

function updateActivity(data) {
    return dispatch => {
        dispatch(request(data));

        activityService.updateActivity(data)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(alertActions.success('Edit activity successful'));
                    // history.push('/');
                    //window.location.reload()

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: activityTypes.ACTIVITY_REQUEST, user } }
    function success(user) { return { type: activityTypes.ACTIVITY_SUCCESS, user } }
    function failure(error) { return { type: activityTypes.ACTIVITY_FAILURE, error } }
}
function deleteActivity(id) {
    return dispatch => {
        dispatch(request(id));

        activityService.deleteActivity(id)
            .then(
                id =>{ 
                    dispatch(success(id));
                    // history.push('/');
                    dispatch(alertActions.success('Delete activity successful'));
                    window.location.reload()

                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: activityTypes.DEL_ACTIVITY_REQUEST, id } }
    function success(id) { return { type: activityTypes.DEL_ACTIVITY_SUCCESS, id } }
    function failure(id, error) { return { type: activityTypes.DEL_ACTIVITY_FAILURE, id, error } }
}