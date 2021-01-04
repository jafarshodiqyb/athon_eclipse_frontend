import jwt from 'jsonwebtoken';
import { userTypes } from './../type/user.type';

export  function authentication(state, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        // user: action.payload
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        payload : verifyToken(action.payload.token)
      };
    case userTypes.LOGIN_FAILURE:
      return {item:action.error};
      case userTypes.UPDATE_REQUEST:
        return {
          loading: true
        };
      case userTypes.UPDATE_SUCCESS:
        return {
          ...state,payload: verifyToken(action.payload.token)
        };
      case userTypes.UPDATE_FAILURE:
        return { 
          error: action.error
        };
    case userTypes.LOGOUT:
      return {};
    default:
      return {
        ...state,payload:verifyToken(JSON.parse(localStorage.getItem('token')))
      }
  }
}

function verifyToken(data){
  const token =  jwt.verify(data, '12345-67890-09876-54321', function(err, decoded) {
    if (err) {
      // let params = queryString.parse(this.props.location.pathname.substr(7,this.props.location.pathname.length));
      // if(!params.token){
        // alert('Sesi habis silahkan login kembali!')
        localStorage.removeItem('token');
      // }
    } else if (decoded) {
      return decoded
    
    }
  })
  return data?token._doc?token._doc:token[0]:{}
}