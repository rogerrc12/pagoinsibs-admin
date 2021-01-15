import axios from "../../helpers/axios";
import * as actionTypes from "../constants";

// GET PAYMENTS PENDING COUNT
export const getPaymentsCount = (status) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/payments/count?status=${status}`);
    if (status === "pending") {
      return dispatch({ type: actionTypes.GET_PENDING_PAYMENTS_COUNT, payload: Number(res.data.count) });
    }
    return dispatch({ type: actionTypes.GET_PAYMENTS_COUNT, payload: Number(res.data.count) });
  } catch (error) {
    console.log(error.response.data.message);
    if (status === "pending") {
      return dispatch({ type: actionTypes.GET_PENDING_PAYMENTS_COUNT_ERROR });
    }
    return dispatch({ type: actionTypes.GET_PAYMENTS_COUNT_ERROR });
  }
};

export const getPaymentsInit = (status) => ({
  type: actionTypes.GET_PAYMENTS_INIT,
  status,
});

export const getPaymentsSuccess = (allPayments, pending, processing) => ({
  type: actionTypes.GET_PAYMENTS_SUCCESS,
  payload: { allPayments, pending, processing },
});

export const getPaymentDetailsInit = (id) => ({
  type: actionTypes.GET_PAYMENT_DETAILS_INIT,
  id,
});

export const getPaymentDetailsSuccess = (details) => ({
  type: actionTypes.GET_PAYMENT_DETAILS_SUCCESS,
  details,
});

export const processPaymentInit = (id) => ({
  type: actionTypes.PROCESS_PAYMENT_INIT,
  id,
});

export const processPaymentSuccess = () => ({
  type: actionTypes.PROCESS_PAYMENT_SUCCESS,
});

export const processBulkPaymentsInit = (payments) => ({
  type: actionTypes.PROCESS_BULK_PAYMENTS_INIT,
  payments,
});

export const processBulkPaymentsSuccess = () => ({
  type: actionTypes.PROCESS_BULK_PAYMENTS_SUCCESS,
});

export const cancelPaymentInit = (id) => ({
  type: actionTypes.CANCEL_PAYMENT_INIT,
  id,
});

export const cancelPaymentSuccess = () => ({
  type: actionTypes.CANCEL_PAYMENT_SUCCESS,
});

export const paymentsError = (msg) => ({
  type: actionTypes.PAYMENTS_ERROR,
  msg,
});

export const clearPaymentsError = () => ({
  type: actionTypes.CLEAR_PAYMENTS_ERROR,
});
