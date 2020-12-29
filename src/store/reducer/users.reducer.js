import { userTypes } from '../type/user.type'

export function users(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case userTypes.GETALL_REQUEST:
      return {
        loading: true
      };
    case userTypes.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userTypes.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userTypes.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userTypes.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userTypes.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
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