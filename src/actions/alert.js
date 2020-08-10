import { SET_ALERT, CLOSE_ALERT } from './constants';

export const setAlert = payload => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload
  })
}

export const closeAlert = () => dispatch => {
  dispatch({
    type: CLOSE_ALERT
  })
}