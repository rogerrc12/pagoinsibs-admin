import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";
import SweetAlert from "../components/UI/SweetAlert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// GET ALL DEBITS BASED ON STATUS
export const getDebits = (status) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.get(`/api/admin/debits?status=${status}`);
    dispatch({ type: actionTypes.REMOVE_LOADING });

    if (status === "pending") {
      return dispatch({ type: actionTypes.GET_PENDING_DEBITS, payload: res.data });
    }
    return dispatch({ type: actionTypes.DEBITS_LOADED, payload: res.data });
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return dispatch({ type: actionTypes.DEBITS_ERROR });
  }
};

// GET TOTAL COUNT OF DEBITS BASED ON STATUS
export const getDebitsCount = (status) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/debits/count?status=${status}`);

    if (status === "pending") {
      return dispatch({ type: actionTypes.GET_PENDING_DEBITS_COUNT, payload: Number(res.data.count) });
    }
    return dispatch({ type: actionTypes.GET_DEBITS_COUNT, payload: Number(res.data.count) });
  } catch (error) {
    console.log(error.response.data.message);
    return dispatch({ type: actionTypes.GET_DEBITS_COUNT_ERROR });
  }
};

// GET DEBIT DETAIL
export const getDebitDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/debits/${id}`);

    dispatch({ type: actionTypes.GET_DEBIT_DETAILS, payload: res.data });
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.GET_DEBIT_DETAILS_ERROR });
  }
};

// GET DEBIT FEES
export const getDebitFees = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/debits/fees/${id}`);
    return dispatch({ type: actionTypes.GET_DEBIT_FEES, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
    return dispatch({ type: actionTypes.GET_DEBIT_FEES_ERROR });
  }
};

// ADD SINGLE DEBIT TO BANK LIST TO PROCESS
export const addDebitToBank = (id) => async (dispatch) => {
  if (!id) return null;
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.post(`/api/admin/bank-payments/debit/${id}`);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch(setAlert({ msg: res.data.message, icon: "success" }));
    dispatch(getDebitDetail(id));
    dispatch(getDebitFees(id));
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return dispatch({ type: actionTypes.ADD_DEBIT_BANK_ERROR });
  }
};

// ADD LOT OF DEBITS TO BANK LIST TO PROCESS
export const processDebits = (debits) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ debits });

    const res = await axios.post("/api/admin/bank-payments/debits", body, config);
    SweetAlert("Procesados", res.data.message, "success");
    dispatch({ type: actionTypes.REMOVE_LOADING });

    return dispatch(getDebits("pending"));
  } catch (error) {
    const message = error.response.data.message;
    if (message) SweetAlert("Error", message, "error");
    return dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};

// CANCEL DEBIT
export const cancelDebit = (id) => async (dispatch) => {
  if (!id) return null;

  try {
    const swalResult = await MySwal.fire({
      title: "Estas seguro?",
      text: "Cancelarás la domiciliación y ya no se podrán cobrar cuotas de la misma.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Cancelarla",
      cancelButtonText: "No, regresar",
    });

    if (swalResult.value) {
      dispatch({ type: actionTypes.SET_LOADING });
      const res = await axios.put(`/api/admin/debits/cancel-debit/${id}`);
      dispatch({ type: actionTypes.REMOVE_LOADING });

      dispatch({ type: actionTypes.GET_DEBIT_DETAILS, payload: res.data });
      return dispatch(getDebitFees(id));
    } else return null;
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  }
};
