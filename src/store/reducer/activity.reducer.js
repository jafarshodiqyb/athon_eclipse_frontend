import { activityTypes } from "../type/activity.type";

export function activities(state = {}, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case activityTypes.ACTIVITY_SUCCESS:
      return {
        loading: false,
        activity: action.payload,
        // user: action.payload
      };
    case activityTypes.ACTIVITY_FAILURE:
      return {
        loading: false,
      };
    case activityTypes.DEL_ACTIVITY_SUCCESS:
      return {
      };
    case activityTypes.DEL_ACTIVITY_FAILURE:
      return {};
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
