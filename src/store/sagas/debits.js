import { all, put, takeEvery, call, delay } from "redux-saga/effects";
import * as actions from "../actions/debits";
import * as types from "../constants";
import axios from "../../helpers/axios";
import Swal from "sweetalert2";

function* getDebits(action) {
  const { status } = action;

  try {
    const res = yield axios.get(`/api/admin/debits?status=${status}`);
    if (res.status === 200) {
      const debits = res.data.length > 0 ? res.data : [];
      const pendingDebits = debits.filter((debit) => debit.statusId !== 2);
      const processingDebits = debits.filter((debit) => debit.statusId === 2);
      yield put(actions.getDebitsSuccess(debits, pendingDebits, processingDebits));
    }
  } catch (error) {
    yield put(actions.debitsError(error.message));
  }
}

function* getDebitDetails(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/admin/debits/${id}`);
    if (res.status === 200) {
      yield put(actions.getDebitDetailsSuccess(res.data));
    }
  } catch (error) {
    yield put(actions.debitsError(error.message));
  }
}

function* getDebitFees(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/admin/debits/fees/${id}`);
    if (res.status === 200) yield put(actions.getDebitFeesSuccess(res.data));
  } catch (error) {
    yield put(actions.debitsError(error.message));
  }
}

function* processDebitFee(action) {
  const { id } = action;

  try {
    const res = yield axios.post(`/api/admin/debits/process/${id}`);
    if (res.status === 200) {
      yield put(actions.getDebitDetailsInit(id));
      yield put(actions.getDebitFeesInit(id));
      yield call([Swal, "fire"], "Exitoso", "La cuota fue procesada correctamente.", "success");
    }
  } catch (error) {
    yield put(actions.debitsError(error.message));
  }
}

function* processBulkDebits({ debits }) {
  try {
    const res = yield axios.post("/api/admin/debits/process", { debits });
    if (res.status === 200) {
      yield put(actions.processBulkDebitsSuccess());
      yield put(actions.getDebitsInit("pending"));
      Swal.fire("Procesados", res.data.message, "success");
    }
  } catch (error) {
    yield put(actions.debitsError(error.data ? error.data.message : error.message));
    yield delay(3000);
    yield put(actions.clearDebitsError());
  }
}

function* cancelDebit(action) {
  const { id } = action;

  const result = yield call([Swal, "fire"], {
    title: "¿Estás seguro?",
    type: "warning",
    html: "Estas a punto de cancelar la domiciliación y todas sus cuotas. Esta acción no se puede revertir.",
    showCancelButton: true,
    confirmButtonText: `Si, continuar`,
    cancelButtonText: "Cancelar",
  });

  if (result.value) {
    try {
      const res = yield axios.put(`/api/admin/debits/cancel/${id}`);
      if (res.status === 200) {
        yield put(actions.getDebitDetailsInit(id));
        yield put(actions.getDebitFeesInit(id));
        yield call([Swal, "fire"], "Exitoso", "La domiciliación y las cuotas restantes fueron canceladas correctamente.", "success");
      }
    } catch (error) {
      yield put(actions.debitsError(error.message));
    }
  } else {
    yield put(actions.debitsError());
  }
}

export default function* () {
  yield all([
    takeEvery(types.GET_DEBITS_INIT, getDebits),
    takeEvery(types.GET_DEBIT_DETAILS_INIT, getDebitDetails),
    takeEvery(types.GET_DEBIT_FEES_INIT, getDebitFees),
    takeEvery(types.PROCESS_DEBIT_FEE_INIT, processDebitFee),
    takeEvery(types.PROCESS_BULK_DEBITS_INIT, processBulkDebits),
    takeEvery(types.CANCEL_DEBIT_INIT, cancelDebit),
  ]);
}
