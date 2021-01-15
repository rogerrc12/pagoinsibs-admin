import * as actionTypes from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload };
    case actionTypes.LOGIN_FAIL:
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, isAuthenticated: false, token: null };
    default:
      return state;
  }
}
