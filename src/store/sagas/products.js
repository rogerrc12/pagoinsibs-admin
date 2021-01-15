import { put, takeLatest, all, delay } from "redux-saga/effects";
import * as actionTypes from "../constants";
import * as actions from "../actions";
import axios from "../../helpers/axios";
import history from "../../helpers/history";

function* getProducts() {
  try {
    const res = yield axios.get(`/api/admin/products`);
    yield put(actions.getProducts(res.data));
  } catch (error) {
    yield put(actions.getProductsError());
  }
}

function* getSupplierProducts(action) {
  try {
    const res = yield axios.get(`/api/admin/products/${action.supplierId}`);
    yield put(actions.getSupplierProducts(res.data));
  } catch (error) {
    yield put(actions.getSupplierProductsError());
  }
}

function* getProductData(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/admin/products/data/${id}`);

    yield put(actions.getProductData(res.data));
  } catch (error) {
    yield put(actions.getProductDataError());
  }
}

function* addProduct(action) {
  const { supplierId, values } = action;

  try {
    const res = yield axios.post(`/api/admin/products/${supplierId}`, values, { headers: { "Content-Type": "application/json" } });
    yield put(actions.setAlert({ msg: res.data.message, icon: "success" }));
    yield delay(1500);
    return yield history.push(`/suppliers/profile/${supplierId}`);
  } catch (error) {
    yield put(actions.setAlert({ msg: error.data.message, icon: "error" }));
    yield put(actions.addProductError());
  }
}

function* editProduct(action) {
  try {
    const res = yield axios.put(`/api/admin/products/${action.productId}`, action.values, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(actions.setAlert({ msg: res.data.message, icon: "success" }));
    yield delay(1500);
    return yield history.push(`/products`);
  } catch (error) {
    yield put(actions.setAlert({ msg: error.data.message, icon: "error" }));
    yield put(actions.editProductError());
  }
}

export default function* () {
  yield all([
    takeLatest(actionTypes.GET_PRODUCTS_INIT, getProducts),
    takeLatest(actionTypes.GET_PRODUCT_DATA_INIT, getProductData),
    takeLatest(actionTypes.GET_SUPPLIER_PRODUCTS_INIT, getSupplierProducts),
    takeLatest(actionTypes.ADD_PRODUCT_INIT, addProduct),
    takeLatest(actionTypes.EDIT_PRODUCT_INIT, editProduct),
  ]);
}
