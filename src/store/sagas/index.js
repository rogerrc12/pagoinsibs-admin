import { all } from 'redux-saga/effects';
import authSaga from './auth';
import productsSaga from './products';
import activitySaga from './activity';
import suppliersSaga from './suppliers';
import paymentsSaga from './payments';
import debitsSaga from './debits';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([authSaga(), productsSaga(), activitySaga(), suppliersSaga(), paymentsSaga(), debitsSaga(), usersSaga()]);
}
