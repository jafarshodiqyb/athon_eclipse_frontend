import { alertTypes } from './../redux/alert.type';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case alertTypes.ERROR:
      return {
        type: 'error',
        message: action.message
      };
    case alertTypes.CLEAR:
      return {};
    default:
      return state
  }
}