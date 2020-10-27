import { all } from "redux-saga/effects";
import suppliersSagas from "./suppliers";
import activitySaga from "./activity";

export default function* () {
  yield all([suppliersSagas(), activitySaga()]);
}
