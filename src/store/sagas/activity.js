import { all, takeLatest, put } from "redux-saga/effects";
import * as actionTypes from "../constants";
import * as actions from "../actions";
import axios from "../../helpers/axios";

function* getCurrencies() {
  try {
    const res = yield axios.get("/api/currencies");
    yield put(actions.getCurrencies(res.data));
  } catch (error) {
    yield put(actions.getCurrenciesError());
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
  yield all([takeLatest(actionTypes.GET_CURRENCIES_INIT, getCurrencies), takeLatest(actionTypes.GET_BANKS_INIT, getBanks)]);
}
