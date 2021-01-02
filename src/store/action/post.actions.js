import { alertActions } from './alert.actions';
import { postsTypes } from '../type/posts.type';
import { postsService } from '../../services/posts.service';
import { dispatchSelector } from '../../utils/dispatchSelector';

export const postsActions = {
    postFeed,
    getAllposts
};


function getAllposts() {
    return dispatch => {
        postsService.getAllFeed()
            .then(
                posts => { 
                    dispatch(dispatchSelector.success(posts, postsTypes.GETPOSTS_SUCCESS));
                    // dispatch(alertActions.success('Get posts successful'));

                },
                error => {
                    dispatch(dispatchSelector.failure(error,postsTypes.GETPOSTS_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function postFeed(body) {
    return dispatch => {
        dispatch(request(body));

        postsService.postFeed(body)
            .then(
                posts => { 
                    dispatch(success(posts));
                    dispatch(alertActions.success('Post feed successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(posts) { return { type: postsTypes.POSTPOSTS_REQUEST, posts } }
    function success(posts) { return { type: postsTypes.POSTPOSTS_SUCCESS, posts } }
    function failure(error) { return { type: postsTypes.POSTPOSTS_FAILURE, error } }
}
