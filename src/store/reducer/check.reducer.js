import { checkTypes } from "../type/check.type";

export function check(state = {}, action) {
  switch (action.type) {
    case checkTypes.CHECKIN_REQUEST:
      return {
        checkining: true,
      };
    case checkTypes.CHECKIN_SUCCESS:
      return {
        ...state,item: action.payload
      };
    case checkTypes.CHECKIN_FAILURE:
      return {};
    case checkTypes.GETCHECKIN_REQUEST:

      return {
        loading: true,
      };
      case checkTypes.GETCHECKIN_REQUEST:
      return {
      };
    case checkTypes.GETCHECKIN_SUCCESS:
      return {
        ...state,item: action.payload
      };
    case checkTypes.GETCHECKIN_FAILURE:
      return {};
      case checkTypes.CHECKOUT_REQUEST:
      return {
        checkouting: true,
      };
    case checkTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        item: action.payload
      };
    case checkTypes.CHECKOUT_FAILURE:
      return {};

    default:
      return state;
  }
}
