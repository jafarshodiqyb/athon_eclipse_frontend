import { postsService } from '../../services/posts.service';
import { dispatchSelector } from '../../utils/dispatchSelector';
import { hashtagTypes } from '../type/hashtag.type';
import { postsTypes } from '../type/posts.type';
import { alertActions } from './alert.actions';

export const postsActions = {
    postFeed,
    getAllposts
};


function getAllposts() {
    return dispatch => {                    
        dispatch(dispatchSelector.request(null,postsTypes.GETPOSTS_REQUEST));
        dispatch(dispatchSelector.request(null,hashtagTypes.HASHTAG_REQUEST));
        postsService.getAllFeed()
            .then(
                posts => { 
                    dispatch(dispatchSelector.success(posts, postsTypes.GETPOSTS_SUCCESS));
                    dispatch(dispatchSelector.success(posts,hashtagTypes.HASHTAG_SUCCESS));

                },
                error => {
                    dispatch(dispatchSelector.failure(error,postsTypes.GETPOSTS_FAILURE));
                    dispatch(dispatchSelector.failure(error,hashtagTypes.HASHTAG_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function postFeed(body) {
    return dispatch => {                    
        dispatch(dispatchSelector.request(body,postsTypes.POSTPOSTS_REQUEST));
        dispatch(dispatchSelector.request(null,hashtagTypes.HASHTAG_REQUEST));
        postsService.postFeed(body)
            .then(
                posts => { 
                    dispatch(dispatchSelector.success(posts,postsTypes.POSTPOSTS_SUCCESS));
                    dispatch(dispatchSelector.success(posts,hashtagTypes.HASHTAG_SUCCESS));
                    dispatch(alertActions.success('Post feed successful'));

                },
                error => {
                    dispatch(dispatchSelector.failure(error,postsTypes.POSTPOSTS_FAILURE));   
                    dispatch(dispatchSelector.failure(error,hashtagTypes.HASHTAG_FAILURE));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}
