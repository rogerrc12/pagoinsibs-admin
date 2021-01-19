import * as actionTypes from "../constants";

export const getUsersInit = () => ({
  type: actionTypes.GET_USERS_INIT,
});

export const getUsersSuccess = (users) => ({
  type: actionTypes.GET_USERS_SUCCESS,
  users,
});

export const getUserDataInit = (id) => ({
  type: actionTypes.GET_USER_DATA_INIT,
  id,
});

export const getUserDataSuccess = (data) => ({
  type: actionTypes.GET_USER_DATA_SUCCESS,
  data,
});

export const addUserInit = (values) => ({
  type: actionTypes.ADD_USER_INIT,
  values,
});

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const editUserInit = (id, values) => ({
  type: actionTypes.EDIT_USER_INIT,
  id,
  values,
});

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const usersError = (msg) => ({
  type: actionTypes.USERS_ERROR,
  msg,
});

// Get all subscribers
export const getSubscribers = () => async (dispatch) => {
  // try {
  //   const res = await axios.get("/api/admin/subscribers");
  //   dispatch({ type: actionTypes.GET_SUBSCRIBERS, payload: res.data });
  // } catch (error) {
  //   console.error(error.message);
  //   dispatch({ type: actionTypes.GETSUBSCRIBERS_ERROR });
  // }
};

// Get Subscriber basic information profile
export const getBasicProfile = (id) => async (dispatch) => {
  // try {
  //   const res = await axios.get(`/api/admin/subscribers/profile/${id}`);
  //   console.log(res.data);
  //   dispatch({ type: actionTypes.PROFILE_DATA, payload: res.data });
  // } catch (error) {
  //   console.error(error.message);
  //   dispatch({ type: actionTypes.PROFILE_ERROR });
  // }
};

// Get Subscriber complete information profile
export const getProfile = (id) => async (dispatch) => {
  // try {
  //   const res = await axios.get(`/api/admin/subscribers/profile/${id}`);
  //   dispatch({ type: actionTypes.PROFILE_DATA, payload: res.data });
  // } catch (error) {
  //   const { message } = error.response.data;
  //   if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  //   dispatch({ type: actionTypes.PROFILE_ERROR });
  // }
};

// Delete user
export const deleteUser = (user) => (dispatch) => {
  // MySwal.fire({
  //   title: "Estás seguro?",
  //   text: `Eliminarás al usuario ${user.first_name + " " + user.last_name}. No podrás revertir esta acción!`,
  //   type: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Si, eliminar!",
  //   cancelButtonText: "Cancelar",
  // }).then(async (result) => {
  //   if (result.value) {
  //     try {
  //       await axios.delete(`/api/admin/users/${user.id}`);
  //       Swal.fire("Eliminado!", "El usuario ha sido eliminado correctamente.", "success");
  //       return dispatch(getUsers());
  //     } catch (error) {
  //       const { message } = error.response.data;
  //       if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  //       dispatch({ type: actionTypes.DELETE_USER_ERROR });
  //     }
  //     // Try catch
  //   }
  // });
};
