import { alertActions } from './alert.actions';
import { postsTypes } from '../type/posts.type';
import { postsService } from '../../services/posts.service';

export const postsActions = {
    postFeed
};


function getAllposts() {
    return dispatch => {
        dispatch(request());

        postsService.getAllposts()
            .then(
                posts => { 
                    dispatch(success(posts));
                    // dispatch(alertActions.success('Get posts successful'));

                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(posts) { return { type: postsTypes.GETposts_REQUEST, posts } }
    function success(posts) { return { type: postsTypes.GETposts_SUCCESS, posts } }
    function failure(error) { return { type: postsTypes.GETposts_FAILURE, error } }
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
