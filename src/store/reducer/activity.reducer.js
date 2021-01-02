import { activityTypes } from "../type/activity.type";

export function activities(state = {}, action) {
  console.log(action.type, action.user);
  switch (action.type) {
    case activityTypes.ACTIVITY_REQUEST:
      return {
        loading: true,
        // user: action.user
      };
    case activityTypes.ACTIVITY_SUCCESS:
      return {
        loading: false,
        activity: action.user,
        // user: action.user
      };
    case activityTypes.ACTIVITY_FAILURE:
      return {
        loading: false,
      };
    case activityTypes.DEL_ACTIVITY_REQUEST:
      return {};
    case activityTypes.DEL_ACTIVITY_SUCCESS:
      return {
        // items: state.items.filter(user => user.id !== action.id)
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
