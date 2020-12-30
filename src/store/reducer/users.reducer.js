import { userTypes } from '../type/user.type'

export function users(state = {}, action) {
  switch (action.type) {
    case userTypes.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userTypes.GETUSER_SUCCESS:
      return {
        items: action.user
      };
    case userTypes.GETUSER_FAILURE:
      return { 
        error: action.error
      };
      case userTypes.PROFILECHANGE_REQUEST:
      return {
        loading: true
      };
    case userTypes.PROFILECHANGE_SUCCESS:
      return {
        items: action.user[0]
      };
    case userTypes.PROFILECHANGE_FAILURE:
      return { 
        error: action.error
      };
      case userTypes.UPDATE_REQUEST:
      return {
        loading: true
      };
    case userTypes.UPDATE_SUCCESS:
      return {
        items: action.user
      };
    case userTypes.UPDATE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}