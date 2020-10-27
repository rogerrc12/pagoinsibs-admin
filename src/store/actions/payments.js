import axios from "../../helpers/axios";
import * as actionTypes from "../constants";
import { setAlert } from "./alert";
import SweetAlert from "../../components/UI/SweetAlert";

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

// GET ALL PAYMENTS BASED ON STATUS
export const getPayments = (status) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.get(`/api/admin/payments?status=${status}`);
    dispatch({ type: actionTypes.REMOVE_LOADING });

    if (status === "pending") {
      return dispatch({ type: actionTypes.PENDING_ACCPAYMENTS_LOADED, payload: res.data });
    }
    return dispatch({ type: actionTypes.ACCPAYMENTS_LOADED, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: actionTypes.REMOVE_LOADING });
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.ACCPAYMENTS_ERROR });
  }
};

// GET ACC PAYMENT DETAILS
export const getAccPaymentDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/payments/${id}`);

    dispatch({ type: actionTypes.GET_ACCPAYMENT_DETAILS, payload: res.data });
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
    dispatch({ type: actionTypes.GET_ACCPAYMENT_DETAILS_ERROR });
  }
};

export const addPaymentToBank = (id) => async (dispatch) => {
  if (id) {
    dispatch({ type: actionTypes.SET_LOADING });

    try {
      const res = await axios.post(`/api/admin/bank-payments/payment/${id}`);
      dispatch({ type: actionTypes.REMOVE_LOADING });

      dispatch({ type: actionTypes.GET_ACCPAYMENT_DETAILS, payload: res.data });
      return dispatch(setAlert({ msg: "El pago ha sido agredado correctamente para procesarse.", icon: "success" }));
    } catch (error) {
      const { message } = error.response.data;
      if (message) dispatch(setAlert({ msg: message, icon: "error" }));
      dispatch({ type: actionTypes.REMOVE_LOADING });
      return dispatch({ type: actionTypes.ADD_PAYMENT_BANK_ERROR });
    }
  } else return null;
};

export const processPayments = (payments) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ payments });
    const res = await axios.post("/api/admin/bank-payments/payments", body, config);
    SweetAlert("Procesados!", res.data.message, "success");
    dispatch({ type: actionTypes.REMOVE_LOADING });

    return dispatch(getPayments("pending"));
  } catch (error) {
    const { message } = error.response.data;
    if (message) SweetAlert("Error!", message, "error");
    return dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};
