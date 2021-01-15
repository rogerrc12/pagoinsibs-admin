import * as actionTypes from "../constants";

export const getDebitsInit = (status) => ({
  type: actionTypes.GET_DEBITS_INIT,
  status,
});

export const getDebitsSuccess = (allDebits, pending, processing) => ({
  type: actionTypes.GET_DEBITS_SUCCESS,
  allDebits,
  pending,
  processing,
});

export const getDebitDetailsInit = (id) => ({
  type: actionTypes.GET_DEBIT_DETAILS_INIT,
  id,
});

export const getDebitDetailsSuccess = (details) => ({
  type: actionTypes.GET_DEBIT_DETAILS_SUCCESS,
  details,
});

export const getDebitFeesInit = (id) => ({
  type: actionTypes.GET_DEBIT_FEES_INIT,
  id,
});

export const getDebitFeesSuccess = (fees) => ({
  type: actionTypes.GET_DEBIT_FEES_SUCCESS,
  fees,
});

export const processDebitFeeInit = (id) => ({
  type: actionTypes.PROCESS_DEBIT_FEE_INIT,
  id,
});

export const processDebitFeeSuccess = () => ({
  type: actionTypes.PROCESS_DEBIT_FEE_SUCCESS,
});

export const processBulkDebitsInit = (debits) => ({
  type: actionTypes.PROCESS_BULK_DEBITS_INIT,
  debits,
});

export const processBulkDebitsSuccess = () => ({
  type: actionTypes.PROCESS_BULK_DEBITS_SUCCESS,
});

export const cancelDebitInit = (id) => ({
  type: actionTypes.CANCEL_DEBIT_INIT,
  id,
});

export const cancelDebitSuccess = () => ({
  type: actionTypes.CANCEL_DEBIT_SUCCESS,
});

export const debitsError = (msg) => ({
  type: actionTypes.DEBITS_ERROR,
  msg,
});

export const clearDebitsError = () => ({
  type: actionTypes.CLEAR_DEBITS_ERROR,
});

// ADD LOT OF DEBITS TO BANK LIST TO PROCESS
export const processDebits = (debits) => async (dispatch) => {
  // dispatch({ type: actionTypes.SET_LOADING });
  // try {
  //   const config = { headers: { "Content-Type": "application/json" } };
  //   const body = JSON.stringify({ debits });
  //   const res = await axios.post("/api/admin/bank-payments/debits", body, config);
  //   SweetAlert("Procesados", res.data.message, "success");
  //   dispatch({ type: actionTypes.REMOVE_LOADING });
  //   return dispatch(getDebits("pending"));
  // } catch (error) {
  //   const message = error.response.data.message;
  //   if (message) SweetAlert("Error", message, "error");
  //   return dispatch({ type: actionTypes.REMOVE_LOADING });
  // }
};
