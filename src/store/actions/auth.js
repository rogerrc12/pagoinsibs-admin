import axios from "../../helpers/axios";
import * as actionTypes from "../constants";
import history from "../../helpers/history";
import { setAlert } from "./alert";
import setAuthToken from "../../helpers/setAuthToken";

// Login action
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify(userData);
    const res = await axios.post("/api/admin/auth", body, config);

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: res.data });
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return dispatch(loadUser());
  } catch (error) {
    const { message } = error.response.data;

    if (message) dispatch(setAlert({ msg: message, icon: "error" }));

    return dispatch({ type: actionTypes.LOGIN_FAIL });
  }
};

// Loading user data
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/admin/auth");

    dispatch({ type: actionTypes.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.AUTH_ERROR });
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
  history.push("/");
};
