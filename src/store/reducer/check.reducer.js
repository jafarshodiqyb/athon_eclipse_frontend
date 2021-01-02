import { checkTypes } from "../type/check.type";

export function check(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case checkTypes.CHECKIN_REQUEST:
      return {
        checkining: true,
        // user: action.user
      };
    case checkTypes.CHECKIN_SUCCESS:
      return {
        // checkin: true,
        ...state,item: action.user
      };
    case checkTypes.CHECKIN_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    case checkTypes.GETCHECKIN_REQUEST:
      // add 'deleting:true' property to user being deleted

      return {
        loading: true,
      };
    case checkTypes.GETCHECKIN_SUCCESS:
      return {
        ...state,item: action.user
      };
    case checkTypes.GETCHECKIN_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {};
      case checkTypes.CHECKOUT_REQUEST:
      return {
        checkouting: true,
        // user: action.user
      };
    case checkTypes.CHECKOUT_SUCCESS:
      return {
        // checkout: true,
        ...state,
        item: action.user
      };
    case checkTypes.CHECKOUT_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    default:
      return state;
  }
}
