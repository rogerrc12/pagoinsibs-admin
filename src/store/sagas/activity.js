import { all, takeLatest, put, call } from "redux-saga/effects";
import * as actionTypes from "../constants";
import * as actions from "../actions";
import axios from "../../helpers/axios";
import history from "../../helpers/history";
import Swal from "sweetalert2";

function* getCurrencies() {
  try {
    const res = yield axios.get("/api/currencies");
    yield put(actions.getCurrencies(res.data));
  } catch (error) {
    yield put(actions.currencyError(error.message));
  }
}

function* getCurrencyData(action) {
  const { currencyId } = action;

  try {
    const res = yield axios.get(`/api/currencies/${currencyId}`);

    if (res.status === 200) yield put(actions.getCurrency(res.data));
  } catch (error) {
    yield put(actions.currencyError(error.message));
  }
}

function* editCurrency(action) {
  const { currencyId, values } = action;

  try {
    const res = yield axios.put(`/api/currencies/${currencyId}`, values);
    if (res.status === 200) {
      yield call([Swal, "fire"], "Exitoso", "Moneda editada correctamente!", "success");
      yield call([history, "push"], "/currencies");
      yield put(actions.getCurrenciesInit());
    }
  } catch (error) {
    yield put(actions.currencyError(error.message));
  }
}

function* getBanks() {
  try {
    const res = yield axios.get("/api/banks");
    yield put(actions.getBanks(res.data));
  } catch (error) {
    yield put(actions.getBanksError());
  }
}

export default function* () {
  yield all([
    takeLatest(actionTypes.GET_CURRENCIES_INIT, getCurrencies),
    takeLatest(actionTypes.GET_CURRENCY_INIT, getCurrencyData),
    takeLatest(actionTypes.EDIT_CURRENCY_INIT, editCurrency),
    takeLatest(actionTypes.GET_BANKS_INIT, getBanks),
  ]);
}
