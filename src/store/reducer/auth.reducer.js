import { userTypes } from './../type/user.type';
import jwt from 'jsonwebtoken'
import queryString from 'query-string';

let userData = JSON.parse(localStorage.getItem('token'))
const token = jwt.verify(userData, '12345-67890-09876-54321', function(err, decoded) {
  if (err) {
    
    // alert('Sesi habis silahkan login kembali!')
    localStorage.removeItem('token');
    // return ()
  } else if (decoded) {
    return decoded
  
  }
})
// console.log(token)
// let token =userData && userData!=null? jwt.verify(userData, '12345-67890-09876-54321'): null
const initialState = token ? { loggedIn: true, payload : token._doc } : {}
export  function authentication(state = initialState, action) {
  switch (action) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        // user: action.payload
      };
    case userTypes.LOGIN_SUCCESS:
        const token =  jwt.verify(action.payload.token, '12345-67890-09876-54321', function(err, decoded) {
          if (err) {
            let params = queryString.parse(this.props.location.pathname.substr(7,this.props.location.pathname.length));
            if(!params.token){
              alert('Sesi habis silahkan login kembali!')
              localStorage.removeItem('token');
            }
            // return ()
          } else if (decoded) {
            return decoded
          
          }
        })
      return {
        ...state,
        payload: token._doc?token._doc:token['0']
      };
    case userTypes.LOGIN_FAILURE:
      return {item:action.error};
    case userTypes.LOGOUT:
      return {};
    default:
      return state
  }
}