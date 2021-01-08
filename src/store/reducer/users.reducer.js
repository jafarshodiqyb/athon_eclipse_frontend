import { userTypes } from '../type/user.type'

export function users(state = {}, action) {
  switch (action.type) {
    case userTypes.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userTypes.GETUSER_SUCCESS:
      return {
        items: action.payload
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
        ...state,loading:false,items: action.payload[0]
      };
    case userTypes.PROFILECHANGE_FAILURE:
      return { 
        error: action.error
      };
      case userTypes.CHANGEPASSWORD_REQUEST:
        return {
          loading: true
        };
      case userTypes.CHANGEPASSWORD_SUCCESS:
        return {
          ...state,item: action.payload
        };
      case userTypes.CHANGEPASSWORD_SUCCESS:
        return { 
          error: action.error
        };
    default:
      return state
  }
}