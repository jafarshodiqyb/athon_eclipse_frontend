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
    case activityTypes.DEL_ACTIVITY_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        // ...state,
        // items: state.items.map(user =>
        //   user.id === action.id
        //     ? { ...user, deleting: true }
        //     : user
        // )
      };
    case activityTypes.DEL_ACTIVITY_SUCCESS:
      // remove deleted user from state
      return {
        // items: state.items.filter(user => user.id !== action.id)
      };
    case activityTypes.DEL_ACTIVITY_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        // ...state,
        // items: state.items.map(user => {
        //   if (user.id === action.id) {
        //     // make copy of user without 'deleting:true' property
        //     const { deleting, ...userCopy } = user;
        //     // return copy of user with 'deleteError:[error]' property
        //     return { ...userCopy, deleteError: action.error };
        //   }

        //   return user;
        // })
      };
      case activityTypes.UPDATE_ACTIVITY_REQUEST:
      // add 'UPDATEeting:true' property to user being UPDATEeted
      return {
        // ...state,
        // items: state.items.map(user =>
        //   user.id === action.id
        //     ? { ...user, UPDATEeting: true }
        //     : user
        // )
      };
    case activityTypes.UPDATE_ACTIVITY_SUCCESS:
      // remove UPDATEeted user from state
      return {
        // items: state.items.filter(user => user.id !== action.id)
      };
    case activityTypes.UPDATE_ACTIVITY_FAILURE:
      // remove 'UPDATEeting:true' property and add 'UPDATEeteError:[error]' property to user 
      return {
        // ...state,
        // items: state.items.map(user => {
        //   if (user.id === action.id) {
        //     // make copy of user without 'UPDATEeting:true' property
        //     const { deleting, ...userCopy } = user;
        //     // return copy of user with 'deleteError:[error]' property
        //     return { ...userCopy, deleteError: action.error };
        //   }

        //   return user;
        // })
      };
    default:
      return state;
  }
}
