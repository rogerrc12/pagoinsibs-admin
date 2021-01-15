import * as actionTypes from "../constants";
import axios from "../../helpers/axios";
import fileDownload from "js-file-download";
import { setAlert } from "./alert";

// GET ALL PAYMENTS DONE WITH CREDIT CARDS
export const getCcPayments = () => async (dispatch) => {
  // try {
  //   const res = await axios.get("/api/admin/activity/cc-payments");
  //   dispatch({ type: actionTypes.CCPAYMENTS_LOADED, payload: res.data });
  // } catch (error) {
  //   const errors = error.response.data.errors;
  //   if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
  //   dispatch({ type: actionTypes.CCPAYMENTS_ERROR });
  // }
};

// GET ALL BANKS
export const getBanksInit = () => ({
  type: actionTypes.GET_BANKS_INIT,
});

export const getBanks = (banks) => ({
  type: actionTypes.GET_BANKS_SUCCESS,
  banks,
});

export const getBanksError = () => ({
  type: actionTypes.GET_BANKS_ERROR,
});

export const getCurrenciesInit = () => ({
  type: actionTypes.GET_CURRENCIES_INIT,
});

export const getCurrencies = (currencies) => ({
  type: actionTypes.GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getCurrencyInit = (currencyId) => ({
  type: actionTypes.GET_CURRENCY_INIT,
  currencyId,
});

export const getCurrency = (currencyData) => ({
  type: actionTypes.GET_CURRENCY_SUCCESS,
  currencyData,
});

export const editCurrencyInit = (currencyId, values) => ({
  type: actionTypes.EDIT_CURRENCY_INIT,
  currencyId,
  values,
});

export const editCurrency = () => ({
  type: actionTypes.EDIT_CURRENCY_SUCCESS,
});

export const currencyError = () => ({
  type: actionTypes.CURRENCY_ERROR,
});

// GENERATE REPORT
export const generateReport = (values) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/admin/reports/${values.reportType}`, values, {
      responseType: "blob",
      timeout: 30000,
    });

    const fileName = res.headers["x-suggested-filename"];

    fileDownload(res.data, fileName);

    dispatch(setAlert({ msg: "Archivo procesado correctamente", icon: "success" }));
  } catch (error) {
    const { message } = JSON.parse(Buffer.from(error.response.data).toString("utf8"));
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return false;
  }
};
