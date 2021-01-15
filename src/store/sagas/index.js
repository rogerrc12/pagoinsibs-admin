import { all } from "redux-saga/effects";
import productsSaga from "./products";
import activitySaga from "./activity";
import suppliersSaga from "./suppliers";
import paymentsSaga from "./payments";
import debitsSaga from "./debits";

export default function* () {
  yield all([productsSaga(), activitySaga(), suppliersSaga(), paymentsSaga(), debitsSaga()]);
}
