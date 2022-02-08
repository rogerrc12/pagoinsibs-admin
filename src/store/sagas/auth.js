import { put, all, fork, takeLatest, takeEvery, call } from "redux-saga/effects";
import * as types from "../constants";
import { loginUserSuccess, logoutSuccess, userLoaded, authError } from "../actions/auth";
import { setAlert } from "../actions/alert";
import axios from "../../helpers/axios";
import history from "../../helpers/history";
import setAuthToken from "../../helpers/setAuthToken";

function* setAuthData(data) {
  const expDate = new Date();
  expDate.setSeconds(expDate.getSeconds() + data.expiresIn);

  yield call([localStorage, "setItem"], "authData", JSON.stringify({ token: data.token, expTime: expDate }));
}

function* loadUser() {
  const authData = yield call([localStorage, "getItem"], "authData");

  if (!authData) return yield call(logout);

  const { token, expTime } = JSON.parse(authData);
  if (!token) return yield call(logout);

  if (new Date(expTime) <= new Date()) return yield call(logout);

  try {
    yield call(setAuthToken, token);
    const res = yield axios.get("/api/admin/auth");
    yield put(userLoaded(res.data));
  } catch (error) {
    yield call(logout);
    yield put(authError());
  }
}

function* loginUser({ values }) {
  try {
    const res = yield axios.post("/api/admin/auth", values);
    if (res.status === 200) {
      const authData = { token: res.data.token, expiresIn: 3600 };
      yield call(setAuthData, authData);
      yield put(loginUserSuccess(res.data.token));
      yield call(loadUser);
    }
  } catch (error) {
    if (error.status === 404) {
      yield put(setAlert({ msg: "Credenciales incorrectas. Por favor verifique los datos.", icon: "error" }));
    } else yield put(setAlert({ msg: "Ha ocurrido un error inesperado. Por favor contacte a soporte.", icon: "error" }));

    yield put(authError());
  }
}

function* logout() {
  yield call([localStorage, "removeItem"], "authData");
  yield put(logoutSuccess());
  yield history.push("/");
}

export function* watchLoadUser() {
  yield takeEvery(types.LOAD_USER, loadUser);
}

export function* watchLoginUser() {
  yield takeLatest(types.LOGIN_INIT, loginUser);
}

export function* watchLogout() {
  yield takeLatest(types.LOGOUT_INIT, logout);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLoadUser), fork(watchLogout)]);
}
