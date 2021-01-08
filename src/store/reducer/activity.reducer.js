import { activityTypes } from '../type/activity.type';

export function activities(state = {}, action) {
  switch (action.type) {
    case activityTypes.ACTIVITY_REQUEST:
      return {
        loading: true,
      };
    case activityTypes.ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: action.payload,
      };
    case activityTypes.ACTIVITY_FAILURE:
      return {
        loading: false,
      };
    case activityTypes.DEL_ACTIVITY_REQUEST:
      return {};
    case activityTypes.DEL_ACTIVITY_SUCCESS:
      return {
      };
    case activityTypes.DEL_ACTIVITY_FAILURE:
      return {};
    case activityTypes.UPDATE_ACTIVITY_REQUEST:
      return {
        
      };
    case activityTypes.UPDATE_ACTIVITY_SUCCESS:
      return {
        loading: false,
      };
    case activityTypes.UPDATE_ACTIVITY_FAILURE:
      return {

      };
    default:
      return state;
  }
}
