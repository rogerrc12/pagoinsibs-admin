import { put, takeLatest, all, delay } from "redux-saga/effects";
import * as actionTypes from "../constants";
import * as actions from "../actions";
import axios from "../../helpers/axios";
import history from "../../helpers/history";

function* getProducts(action) {
  try {
    const res = yield axios.get(`/api/admin/products/${action.supplierId}`);
    yield put(actions.getProducts(res.data));
  } catch (error) {
    yield put(actions.getProductsError());
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
    const res = yield axios.put(`/api/admin/products/${action.supplierId}/${action.productId}`, action.values, {
      headers: { "Content-Type": "application/json" },
    });
    yield put(actions.setAlert({ msg: res.data.message, icon: "success" }));
    yield delay(1500);
    return yield history.push(`/suppliers/profile/${action.supplierId}`);
  } catch (error) {
    yield put(actions.setAlert({ msg: error.data.message, icon: "error" }));
    yield put(actions.editProductError());
  }
}

export default function* () {
  yield all([
    takeLatest(actionTypes.GET_PRODUCTS_INIT, getProducts),
    takeLatest(actionTypes.ADD_PRODUCT_INIT, addProduct),
    takeLatest(actionTypes.EDIT_PRODUCT_INIT, editProduct),
  ]);
}
