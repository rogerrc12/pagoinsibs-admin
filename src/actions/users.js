import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// GET all users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/users");

    dispatch({
      type: actionTypes.GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    dispatch({ type: actionTypes.GETUSERS_ERROR });
  }
};

// Get all subscribers
export const getSubscribers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/subscribers");

    dispatch({ type: actionTypes.GET_SUBSCRIBERS, payload: res.data });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: actionTypes.GETSUBSCRIBERS_ERROR });
  }
};

// Get Subscriber basic information profile
export const getBasicProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/subscribers/profile/${id}`);
    console.log(res.data);
    dispatch({ type: actionTypes.PROFILE_DATA, payload: res.data });
  } catch (error) {
    console.error(error.message);

    dispatch({ type: actionTypes.PROFILE_ERROR });
  }
};

// Get Subscriber complete information profile
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/subscribers/profile/${id}`);

    dispatch({ type: actionTypes.PROFILE_DATA, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));

    dispatch({ type: actionTypes.PROFILE_ERROR });
  }
};

// Register a new user with moderator/manager roles
export const registerUser = (data) => async (dispatch) => {
  const newUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    cedula: data.ci_type + data.ci_number,
    email: data.email,
    password: data.password,
    role_id: parseInt(data.role_id),
  };

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify(newUser);
    const res = await axios.post("/api/admin/users", body, config);

    dispatch(setAlert({ msg: res.data.message, icon: "success" }));
    dispatch(getUsers());

    return true;
  } catch (error) {
    console.error(error.response.data);
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  }
};

// get user info from id to edit
export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/users/${id}`);
    dispatch({ type: actionTypes.GET_USER, payload: res.data });
  } catch (error) {
    console.log(error.response.data);
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.GET_USER_ERROR });
  }
};

// Edit user information
export const editUser = (values, userid) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const body = JSON.stringify(values);
    const res = await axios.put(`/api/admin/users/${userid}`, body, config);

    dispatch(setAlert({ msg: res.data.message, icon: "success" }));

    return true;
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    dispatch({ type: actionTypes.EDIT_USER_ERROR });
  }
};

// Delete user
export const deleteUser = (user) => (dispatch) => {
  MySwal.fire({
    title: "Estás seguro?",
    text: `Eliminarás al usuario ${user.first_name + " " + user.last_name}. No podrás revertir esta acción!`,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.value) {
      try {
        await axios.delete(`/api/admin/users/${user.id}`);

        Swal.fire("Eliminado!", "El usuario ha sido eliminado correctamente.", "success");

        return dispatch(getUsers());
      } catch (error) {
        const { message } = error.response.data;
        if (message) dispatch(setAlert({ msg: message, icon: "error" }));

        dispatch({ type: actionTypes.DELETE_USER_ERROR });
      }
      // Try catch
    }
  });
};
