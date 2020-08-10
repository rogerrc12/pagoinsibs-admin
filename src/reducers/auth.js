import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case USER_LOADED :
      return {...state, isAuthenticated: true, user: payload}
    case LOGIN_SUCCESS :
      localStorage.setItem('token', payload.token);
      return {...state, ...payload}
    case LOGIN_FAIL :
    case AUTH_ERROR :
    case LOGOUT :
      localStorage.removeItem('token');
      return {...state, user: null, isAuthenticated: false, token: null}
    default :
      return state;
  }
}