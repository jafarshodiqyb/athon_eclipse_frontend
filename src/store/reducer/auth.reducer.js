import { userTypes } from './../type/user.type';
import jwt from 'jsonwebtoken'
let userData = JSON.parse(localStorage.getItem('token'))

const token = jwt.verify(userData, '12345-67890-09876-54321', function(err, decoded) {
  if (err) {
    alert('Sesi habis silahkan login kembali!')
    localStorage.removeItem('token');
    // return ()
  } else if (decoded) {
    return decoded
  
  }
})
// console.log(token)
// let token =userData && userData!=null? jwt.verify(userData, '12345-67890-09876-54321'): null
const initialState = token ? { loggedIn: true, user : token._doc } : {}
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userTypes.LOGIN_SUCCESS:
      const token = jwt.verify(userData, '12345-67890-09876-54321', function(err, decoded) {
        if (err) {
          alert('Sesi habis silahkan login kembali!')
          localStorage.removeItem('token');
          // return ()
        } else if (decoded) {
          return decoded
        
        }
      })
      return {
        loggedIn: true,
        user: token._doc
      };
    case userTypes.LOGIN_FAILURE:
      return {};
    case userTypes.LOGOUT:
      return {};
    default:
      return state
  }
}