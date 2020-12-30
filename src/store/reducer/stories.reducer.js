import { storiesTypes } from "../type/stories.type";

export function stories(state = {}, action) {
  switch (action.type) {
    case storiesTypes.GETSTORIES_REQUEST:
      return {
        gettingstories: true,
        // user: action.user
      };
    case storiesTypes.GETSTORIES_SUCCESS:
      return {
        getstories: true,
        user: action.stories
      };
    case storiesTypes.GETSTORIES_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    default:
      return state;
  }
}
