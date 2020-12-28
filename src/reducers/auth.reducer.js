import { userTypes } from './../redux/user.type';
import jwt from 'jsonwebtoken'
let userData = JSON.parse(localStorage.getItem('token'))
let token =userData && userData!=null? jwt.verify(userData, '12345-67890-09876-54321'): null
const initialState = token ? { loggedIn: true, user : token._doc } : {}
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userTypes.LOGIN_FAILURE:
      return {};
    case userTypes.LOGOUT:
      return {};
    default:
      return state
  }
}