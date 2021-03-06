import { SET_ALERT, CLOSE_ALERT } from "../constants";

export const setAlert = (payload) => ({
  type: SET_ALERT,
  payload,
});

export const closeAlert = () => ({
  type: CLOSE_ALERT,
});
