import * as actionTypes from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isProcessing: false,
};

export default function (state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case actionTypes.LOAD_USER:
      return { ...state, isProcessing: true };
    case actionTypes.USER_LOADED:
      return { ...state, isAuthenticated: true, isProcessing: false, user: action.user };
    case actionTypes.LOGIN_INIT:
      return { ...state, isProcessing: true };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, token: action.token };
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT_SUCCESS:
      return { ...state, user: null, isAuthenticated: false, token: null, isProcessing: false };
    default:
      return state;
  }
}
