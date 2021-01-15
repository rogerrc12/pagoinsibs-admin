import { put, takeEvery, all, call, delay } from "redux-saga/effects";
import * as actions from "../actions/payments";
import * as types from "../constants";
import axios from "../../helpers/axios";
import Swal from "sweetalert2";

function* getPayments(action) {
  const { status } = action;

  try {
    const res = yield axios.get(`/api/admin/payments?status=${status}`);
    if (res.status === 200) {
      const payments = res.data.length > 0 ? res.data : [];
      const pendingPayments = payments.filter((payment) => payment.statusId !== 2);
      const processingPayments = payments.filter((payment) => payment.statusId === 2);

      yield put(actions.getPaymentsSuccess(payments, pendingPayments, processingPayments));
    }
  } catch (error) {
    yield put(actions.paymentsError(error.message));
  }
}

function* getPaymentDetails(action) {
  const { id } = action;

  try {
    const res = yield axios.get(`/api/admin/payments/${id}`);
    if (res.status === 200) yield put(actions.getPaymentDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.paymentsError(error.message));
  }
}

function* processPayment(action) {
  const { id } = action;

  try {
    const res = yield axios.patch(`/api/admin/payments/process/${id}`);
    if (res.status === 200) {
      yield put(actions.processPaymentSuccess());
      yield put(actions.getPaymentDetailsInit(id));
      yield call([Swal, "fire"], "Exitoso", "El pago ha sido procesado exitosamente!", "success");
    }
  } catch (error) {
    yield put(actions.paymentsError(error.message));
  }
}

function* processBulkPayments({ payments }) {
  try {
    const res = yield axios.post("/api/admin/payments/process", { payments });
    console.log(res);
    if (res.status === 200) {
      yield put(actions.processBulkPaymentsSuccess());
      yield put(actions.getPaymentsInit("pending"));
      Swal.fire("Procesados!", res.data.message, "success");
    }
  } catch (error) {
    yield put(actions.paymentsError(error.data ? error.data.message : error.message));
    yield delay(3000);
    yield put(actions.clearPaymentsError());
  }
}

function* cancelPayment(action) {
  const { id } = action;

  const result = yield call([Swal, "fire"], {
    title: "¿Estás seguro?",
    type: "warning",
    html: "Estas a punto de cancelar el pago. Esta acción no se puede revertir.",
    showCancelButton: true,
    confirmButtonText: `Si, continuar`,
    cancelButtonText: "Cancelar",
  });

  if (result.value) {
    try {
      const res = yield axios.patch(`/api/admin/payments/cancel/${id}`);
      if (res.status === 200) {
        yield put(actions.cancelPaymentSuccess());
        yield put(actions.getPaymentDetailsInit(id));
        yield call([Swal, "fire"], "Exitoso", "El pago ha sido cancelado.", "success");
      }
    } catch (error) {
      yield put(actions.paymentsError(error.message));
    }
  } else {
    yield put(actions.paymentsError());
  }
}

export default function* () {
  yield all([
    takeEvery(types.GET_PAYMENTS_INIT, getPayments),
    takeEvery(types.GET_PAYMENT_DETAILS_INIT, getPaymentDetails),
    takeEvery(types.PROCESS_PAYMENT_INIT, processPayment),
    takeEvery(types.PROCESS_BULK_PAYMENTS_INIT, processBulkPayments),
    takeEvery(types.CANCEL_PAYMENT_INIT, cancelPayment),
  ]);
}
