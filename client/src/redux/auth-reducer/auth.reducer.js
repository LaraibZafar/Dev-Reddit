import authActionTypes from "./auth.types";

const INITIAL_STATE = {
  token: localStorage.getItem("token"), //Initially null, eventually will be returned by the back-end
  isAuthenticated: null, //when we get a success response from login/register
  loading: true, //we haven't gotten the authentication response from the back-end
  user: null,
};

const auth = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER_SUCCESS:
    case authActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...currentState,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case authActionTypes.REGISTER_FAILURE:
    case authActionTypes.AUTH_ERROR:
    case authActionTypes.LOGIN_FAILURE:
    case authActionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case authActionTypes.USER_LOADED:
      return {
        ...currentState,
        isAuthenticated: true,
        loading: false,
        user: action.payload, //user
      };
    default:
      return currentState;
  }
};

export default auth;
