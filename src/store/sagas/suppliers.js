import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "../../helpers/axios";
import * as actions from "../actions";
import * as actionTypes from "../constants";
import history from "../../helpers/history";
import Swal from "sweetalert2";

function* getSuppliers() {
  try {
    const res = yield axios.get("/api/admin/suppliers");
    yield put(actions.getSuppliers(res.data));
  } catch (error) {
    yield put(actions.getSuppliersError());
  }
}

function* getSupplierProfile(action) {
  try {
    const res = yield axios.get(`/api/admin/suppliers/profile/${action.supplierId}`);
    yield put(actions.getSupplierProfile(res.data));
  } catch (error) {
    yield put(actions.getSupplierProfileError());
  }
}

function* addSupplier({ values }) {
  try {
    const res = yield axios.post("/api/admin/suppliers", values);
    if (res.status === 200) {
      yield put(actions.addSupplierSuccess());
      yield call([Swal, "fire"], "Exitoso", "Comercio agregado correctamente", "success");
      yield call([history, "push"], "/suppliers");
    }
  } catch (error) {
    yield put(actions.supplierError(error.message));
  }
}

function* editSupplier({ values, id }) {
  try {
    const res = yield axios.put(`/api/admin/suppliers/${id}`, values);
    if (res.status === 200) {
      yield put(actions.addSupplierSuccess());
      yield call([Swal, "fire"], "Exitoso", "Comercio editado correctamente", "success");
      yield call([history, "push"], "/suppliers");
    }
  } catch (error) {
    yield put(actions.supplierError(error.message));
  }
}

function* deleteSupplier({ supplier }) {
  const result = yield call([Swal, "fire"], {
    title: "Estas seguro?",
    text: `Eliminarás al comercio ${supplier.name}.`,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  });

  if (result.value) {
    try {
      const res = yield axios.delete(`/api/admin/suppliers/${supplier.id}`);
      if (res.status === 200) {
        yield put(actions.deleteSupplierSuccess());
        yield put(actions.getSuppliersInit());
        yield call([Swal, "fire"], "Eliminado!", "El comercio ha sido eliminado correctamente.", "success");
      }
    } catch (error) {
      yield put(actions.supplierError(error.message));
    }
  }
}

function* addSupplierAccount(action) {
  const { values, supplierId } = action;

  try {
    const res = yield axios.post(`/api/admin/suppliers/bank-account/${supplierId}`, values, { headers: { "Content-Type": "application/json" } });
    yield put(actions.setAlert({ msg: res.data.message, icon: "success" }));
    yield put(actions.addSupplierAccount());
    return history.push(`/suppliers/profile/${supplierId}`);
  } catch (error) {
    yield put(actions.addSupplierAccountError());
  }
}

function* getSupplierAccount(action) {
  const { accountId } = action;

  try {
    const res = yield axios.get(`/api/admin/suppliers/bank-account/${accountId}`);
    console.log(res.data);
  } catch (error) {
    yield put(actions.getSupplierAccountError());
  }
}

export default function* () {
  yield all([
    takeLatest(actionTypes.GET_SUPPLIERS_INIT, getSuppliers),
    takeLatest(actionTypes.GET_SUPPLIER_PROFILE_INIT, getSupplierProfile),
    takeLatest(actionTypes.ADD_SUPPLIER_INIT, addSupplier),
    takeLatest(actionTypes.EDIT_SUPPLIER_INIT, editSupplier),
    takeLatest(actionTypes.DELETE_SUPPLIER_INIT, deleteSupplier),
    takeLatest(actionTypes.ADD_SUPPLIER_ACCOUNT_INIT, addSupplierAccount),
    takeLatest(actionTypes.GET_SUPPLIER_ACCOUNT_INIT, getSupplierAccount),
  ]);
}
