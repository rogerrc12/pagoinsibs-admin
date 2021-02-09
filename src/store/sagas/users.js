import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { usersError, getUsersSuccess, getUserDataSuccess, addUserSuccess, editUserSuccess, getSubscribersSuccess, subscribersError, getProfileSuccess } from "../actions/users";
import { ADD_USER_INIT, EDIT_USER_INIT, GET_USERS_INIT, GET_USER_DATA_INIT, GET_SUBSCRIBERS_INIT, GET_SUBS_PROFILE_INIT } from "../constants";
import axios from "../../helpers/axios";
import Swal from "sweetalert2";
import history from "../../helpers/history";

function* getUsers() {
  try {
    const res = yield call(axios.get, "/api/admin/users");
    if (res.status === 200) yield put(getUsersSuccess(res.data));
  } catch (error) {
    yield put(usersError(error.data ? error.data.message : error.message));
  }
}

function* getUserData({ id }) {
  try {
    const res = yield call(axios.get, `/api/admin/users/${id}`);
    if (res.status === 200) yield put(getUserDataSuccess(res.data));
  } catch (error) {
    yield put(usersError(error.data ? error.data.message : error.message));
  }
}

function* addUser({ values }) {
  const newUser = {
    first_name: values.first_name,
    last_name: values.last_name,
    cedula: values.ci_type + values.ci_number,
    email: values.email,
    password: values.password,
    role_id: parseInt(values.role_id),
  };

  try {
    const res = yield call(axios.post, "/api/admin/users", newUser);
    if (res.status === 200) {
      yield put(addUserSuccess());
      yield Swal.fire("Exitoso", "El usuario fue agregado correctamente.", "success");
      yield call(history.goBack);
    }
  } catch (error) {
    yield put(usersError(error.data ? error.data.message : error.message));
  }
}

function* editUser({ id, values }) {
  try {
    const res = yield call(axios.put, `/api/admin/users/${id}`, values);
    if (res.status === 200) {
      yield put(editUserSuccess());
      yield Swal.fire("Exitoso", "El usuario fue editado correctamente.", "success");
      yield call(history.goBack);
    }
  } catch (error) {
    yield put(usersError(error.data ? error.data.message : error.message));
  }
}

function* getSubscribers() {
  try {
    const res = yield axios.get("/api/admin/subscribers");
    if (res.status === 200) yield put(getSubscribersSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(subscribersError(error.data ? error.data.message : error.message));
  }
}

function* getProfile({ id }) {
  try {
    const res = yield axios.get(`/api/admin/subscribers/profile/${id}`);
    if (res.status === 200) yield put(getProfileSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(subscribersError(error.data ? error.data.message : error.message));
  }
}

export default function* () {
  yield all([
    takeEvery(GET_USERS_INIT, getUsers),
    takeLatest(ADD_USER_INIT, addUser),
    takeLatest(GET_USER_DATA_INIT, getUserData),
    takeLatest(EDIT_USER_INIT, editUser),
    takeLatest(GET_SUBSCRIBERS_INIT, getSubscribers),
    takeLatest(GET_SUBS_PROFILE_INIT, getProfile),
  ]);
}
