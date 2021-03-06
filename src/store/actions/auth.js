import * as actionTypes from "../constants";

export const loginUserInit = (values) => ({
  type: actionTypes.LOGIN_INIT,
  values,
});

export const loginUserSuccess = (token) => ({
  type: actionTypes.LOGIN_SUCCESS,
  token,
});

// Loading user data
export const loadUser = () => ({
  type: actionTypes.LOAD_USER,
});

export const userLoaded = (user) => ({
  type: actionTypes.USER_LOADED,
  user,
});

// Logout Action
export const logoutInit = () => ({
  type: actionTypes.LOGOUT_INIT,
});

export const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
});

export const authError = () => ({
  type: actionTypes.AUTH_ERROR,
});
