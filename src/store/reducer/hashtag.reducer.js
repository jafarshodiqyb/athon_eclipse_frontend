import { hashtagTypes } from '../type/hashtag.type';
import { alertTypes } from './../type/alert.type';

export function hashtag(state = {}, action) {
    console.log(state,action)
  switch (action.type) {
    case hashtagTypes.HASHTAG_REQUEST:
      return {
        // user: action.payload
      };
    case hashtagTypes.HASHTAG_SUCCESS:
      return {
        // checkin: true,
        ...state,item: action.payload
      };
    case hashtagTypes.HASHTAG_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    default:
      return state
  }
}