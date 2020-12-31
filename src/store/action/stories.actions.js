import { alertActions } from './alert.actions';
import { storiesTypes } from '../type/stories.type';
import { storiesService } from '../../services/stories.service';

export const storiesActions = {
    getAllStories,
    postStories
};


function getAllStories() {
    return dispatch => {
        dispatch(request());

        storiesService.getAllStories()
            .then(
                stories => { 
                    dispatch(success(stories));
                    // dispatch(alertActions.success('Get Stories successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(stories) { return { type: storiesTypes.GETSTORIES_REQUEST, stories } }
    function success(stories) { return { type: storiesTypes.GETSTORIES_SUCCESS, stories } }
    function failure(error) { return { type: storiesTypes.GETSTORIES_FAILURE, error } }
}

function postStories(body) {
    return dispatch => {
        dispatch(request(body));

        storiesService.postStories(body)
            .then(
                stories => { 
                    dispatch(success(stories));
                    dispatch(alertActions.success('Post Stories successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(stories) { return { type: storiesTypes.POSTSTORIES_REQUEST, stories } }
    function success(stories) { return { type: storiesTypes.POSTSTORIES_SUCCESS, stories } }
    function failure(error) { return { type: storiesTypes.POSTSTORIES_FAILURE, error } }
}
