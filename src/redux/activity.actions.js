import { checkTypes } from './check.type';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';
import { activityService } from '../services/activity.service';
import { activityTypes } from './activity.type';

export const activityActions= {
    addActivity
};


function addActivity(data) {
    return dispatch => {
        dispatch(request(data));

        activityService.addActivity(data)
            .then(
                data => { 
                    dispatch(success(data));
                    history.push('/');
                    dispatch(alertActions.success('Add activity successful'));
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

