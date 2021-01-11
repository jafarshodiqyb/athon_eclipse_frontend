import jwt from "jsonwebtoken";

import { userTypes } from "./../type/user.type";
export function authentication(state, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        payload: verifyToken(action.payload.token),
      };
    case userTypes.LOGIN_FAILURE:
      return { item: action.error };
    case userTypes.UPDATE_REQUEST:
      return {
        loading: true,
      };
    case userTypes.UPDATE_SUCCESS:
      return {
        ...state,
        payload: verifyToken(action.payload.token),
      };
    case userTypes.UPDATE_FAILURE:
      return {
        error: action.error,
      };
    case userTypes.SETPASSWORD_REQUEST:
      return {
        loading: true,
      };
    case userTypes.SETPASSWORD_SUCCESS:
      return {
        ...state,
        payload: verifyToken(action.payload.token)
        
      };
    case userTypes.SETPASSWORD_REQUEST:
      return {
        error: action.error,
      };
    case userTypes.LOGOUT:
      return {};
    default:
      return {
        ...state,
        payload: verifyToken(JSON.parse(localStorage.getItem("token"))),
      };
  }
}

function verifyToken(data) {
  // const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("JWT_Token"));
  // console.log(jwt_Token_decoded.exp * 1000);
  // console.log(Date.now());
  // if (jwt_Token_decoded.exp * 1000 < Date.now()) {
  //     localStorage.clear(); // this runs only when I refresh the page or reload on route change it dosent work
  // } else {
  //     initialstate.user = jwt_Token_decoded;
  // }

  const token = jwt.verify(data, "12345-67890-09876-54321", (err, decoded)=> {
      console.log(err)
      if (err && !err.message.includes('jwt must be provided')) {
        localStorage.removeItem("token");
      } else if(decoded && decoded.exp * 1000 < Date.now()){
        alert('Sesi habis silahkan login kembali!')
        localStorage.removeItem("token");
      } else if (decoded) {
        return decoded;
      }
    }
  );
  return (typeof token !="undefined" && data) ?token._doc  : null 
}
