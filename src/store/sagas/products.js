import { put, takeLatest, all, call } from 'redux-saga/effects';
import * as actionTypes from '../constants';
import * as actions from '../actions';
import axios from '../../helpers/axios';
import history from '../../helpers/history';
import Swal from 'sweetalert2';

function* getProducts() {
  try {
    const res = yield axios.get(`/api/admin/products`);
    if (res.status === 200) yield put(actions.getProducts(res.data));
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

function* getSupplierProducts({ supplierId }) {
  try {
    const res = yield axios.get(`/api/admin/products/${supplierId}`);
    if (res.status === 200) yield put(actions.getSupplierProducts(res.data));
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

function* getProductData(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/admin/products/data/${id}`);
    if (res.status === 200) yield put(actions.getProductData(res.data));
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

function* addProduct({ supplierId, values }) {
  try {
    const res = yield axios.post(`/api/admin/products/${supplierId}`, values);

    if (res.status === 200) {
      yield Swal.fire('Exitoso', res.data.message, 'success');
      yield call(history.push, `/suppliers/profile/${supplierId}`);
    }
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

function* editProduct({ productId, values }) {
  try {
    const res = yield axios.put(`/api/admin/products/${productId}`, values);
    if (res.status === 200) {
      yield Swal.fire('Exitoso', res.data.message, 'success');
      yield call(history.push, `/products`);
    }
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

function* deleteProduct({ productId, supplierId }) {
  try {
    const result = yield Swal.fire({
      title: '¿Deseas eliminar este producto?',
      text: 'Esta acción no puede ser revertida',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: `Si, continuar`,
      cancelButtonText: `No, cancelar`,
    });
    if (result.value) {
      yield axios.delete(`/api/admin/products/${productId}`);
      yield put(actions.getSupplierProductsInit(supplierId));
      yield Swal.fire('Producto eliminado!', 'El producto fue eliminado correctamente', 'success');
    }
  } catch (error) {
    yield put(actions.productsError(error.data ? error.data.message : error.message));
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(actionTypes.GET_PRODUCTS_INIT, getProducts),
    takeLatest(actionTypes.GET_PRODUCT_DATA_INIT, getProductData),
    takeLatest(actionTypes.GET_SUPPLIER_PRODUCTS_INIT, getSupplierProducts),
    takeLatest(actionTypes.ADD_PRODUCT_INIT, addProduct),
    takeLatest(actionTypes.EDIT_PRODUCT_INIT, editProduct),
    takeLatest(actionTypes.DELETE_PRODUCT_INIT, deleteProduct),
  ]);
}
