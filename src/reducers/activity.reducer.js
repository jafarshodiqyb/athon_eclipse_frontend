import { activityTypes } from "../redux/activity.type";

export function check(state = {}, action) {
  switch (action.type) {
    case activityTypes.ACTIVITY_REQUEST:
      return {
        loading: true,
        // user: action.user
      };
    case activityTypes.ACTIVITY_SUCCESS:
      return {
        activity: action.users,
        // user: action.user
      };
    case activityTypes.ACTIVITY_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    default:
      return state;
  }
}
