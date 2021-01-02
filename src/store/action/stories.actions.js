import { alertActions } from './alert.actions';
import { storiesTypes } from '../type/stories.type';
import { storiesService } from '../../services/stories.service';
import { dispatchSelector } from '../../utils/dispatchSelector';

export const storiesActions = {
    getAllStories,
    postStories
};


function getAllStories() {
    return dispatch => {                    
        dispatch(dispatchSelector.request(null,storiesTypes.GETSTORIES_REQUEST));
        storiesService.getAllStories()
            .then(
                stories => { 
                    dispatch(dispatchSelector.success(stories, storiesTypes.GETSTORIES_SUCCESS));  
                    // dispatch(alertActions.success('Get Stories successful'));

                },
                error => {
                    dispatch(dispatchSelector.failure(error, storiesTypes.GETSTORIES_FAILURE));  
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function postStories(body) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(body,storiesTypes.POSTSTORIES_REQUEST));
        storiesService.postStories(body)
            .then(
                stories => {
                    dispatch(dispatchSelector.success(stories, storiesTypes.POSTSTORIES_SUCCESS));  
                    dispatch(alertActions.success('Post Stories successful'));

                },
                error => {
                    dispatch(dispatchSelector.failure(error, storiesTypes.POSTSTORIES_FAILURE));  
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}
