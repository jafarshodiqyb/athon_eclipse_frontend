import { checkTypes } from './../type/check.type';
import { alertActions } from './alert.actions';
import { history } from '../../utils/history';
import { activityService } from '../../services/activity.service';
import { activityTypes } from './../type/activity.type';
import { checkActions } from './../action/check.actions';
import { dispatchSelector } from '../../utils/dispatchSelector';

export const activityActions= {
    addActivity,
    deleteActivity,
    updateActivity
};


function addActivity(data) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(data,activityTypes.ACTIVITY_REQUEST));
        dispatch(dispatchSelector.request(data,checkTypes.GETCHECKIN_REQUEST));
        activityService.addActivity(data)
            .then(
                data => { 
                    // dispatch(success(data));
                    dispatch(dispatchSelector.success(data,activityTypes.ACTIVITY_SUCCESS));
                    dispatch(dispatchSelector.success(data,checkTypes.GETCHECKIN_SUCCESS));
                    dispatch(alertActions.success('Add activity successful'));
                    // history.push('/');
                    // window.location.reload()

                },
                error => {
                    // dispatch(failure(error.toString()));
                    dispatch(dispatchSelector.error(error,activityTypes.ACTIVITY_FAILURE));
                    dispatch(dispatchSelector.error(error,checkTypes.GETCHECKIN_FAILURE));

                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function updateActivity(data) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(data,activityTypes.UPDATE_ACTIVITY_REQUEST));
        dispatch(dispatchSelector.request(data,checkTypes.GETCHECKIN_REQUEST));    
        activityService.updateActivity(data)
            .then(
                data => { 
                    dispatch(dispatchSelector.success(data,activityTypes.UPDATE_ACTIVITY_SUCCESS));
                    dispatch(dispatchSelector.success(data,checkTypes.GETCHECKIN_SUCCESS));
                    dispatch(alertActions.success('Edit activity successful'));
                    // history.push('/');
                    // window.location.reload()

                },
                error => {
                    dispatch(dispatchSelector.error(error,activityTypes.UPDATE_ACTIVITY_FAILURE));
                    dispatch(dispatchSelector.error(error,checkTypes.GETCHECKIN_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}
function deleteActivity(id) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(id,activityTypes.DEL_ACTIVITY_REQUEST));
        dispatch(dispatchSelector.request(id,checkTypes.GETCHECKIN_REQUEST));
        activityService.deleteActivity(id)
            .then(
                id =>{ 
                    dispatch(dispatchSelector.success(id,activityTypes.DEL_ACTIVITY_SUCCESS));
                    dispatch(dispatchSelector.success(id,checkTypes.GETCHECKIN_SUCCESS));
                    dispatch(alertActions.success('Delete activity successful'));
                    // window.location.reload()

                },
                error => {
                    dispatch(dispatchSelector.error(error,activityTypes.DEL_ACTIVITY_FAILURE));
                    dispatch(dispatchSelector.error(error,checkTypes.GETCHECKIN_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}