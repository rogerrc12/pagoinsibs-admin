import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as actionTypes from '../constants';
import * as actions from '../actions';
import axios from '../../helpers/axios';
import history from '../../helpers/history';
import Swal from 'sweetalert2';
import fileDownload from 'js-file-download';

function* getCurrencies() {
  try {
    const res = yield axios.get('/api/currencies');
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
      yield call([Swal, 'fire'], 'Exitoso', 'Moneda editada correctamente!', 'success');
      yield call([history, 'push'], '/currencies');
      yield put(actions.getCurrenciesInit());
    }
  } catch (error) {
    yield put(actions.currencyError(error.message));
  }
}

function* getBanks() {
  try {
    const res = yield axios.get('/api/banks');
    yield put(actions.getBanks(res.data));
  } catch (error) {
    yield put(actions.getBanksError());
  }
}

function* generateReport({ values }) {
  const reportValues = { ...values };

  if (values.reportType === 'pending-bank') reportValues.currencyId = 2;

  try {
    const res = yield axios.post(`/api/admin/reports/${values.reportType}`, reportValues, { responseType: 'blob' });

    const fileName = res.headers['x-suggested-filename'];
    fileDownload(res.data, fileName);
    yield Swal.fire('Exitoso', 'El reporte ha sido creado correctamente', 'success');
  } catch (error) {
    if (error.status === 404) return yield Swal.fire('Error', 'No se han encontrado registros para estas opciones y rangos de fecha.', 'error');
    return yield Swal.fire('Error', 'Ha ocurrido un error generando el reporte.', 'error');
  }
}

export default function* activitySaga() {
  yield all([
    takeLatest(actionTypes.GET_CURRENCIES_INIT, getCurrencies),
    takeLatest(actionTypes.GET_CURRENCY_INIT, getCurrencyData),
    takeLatest(actionTypes.EDIT_CURRENCY_INIT, editCurrency),
    takeLatest(actionTypes.GET_BANKS_INIT, getBanks),
    takeLatest(actionTypes.GENERATE_REPORT_INIT, generateReport),
  ]);
}
