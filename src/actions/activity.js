import * as actionTypes from "./constants";
import axios from "../helpers/axios";
import fileDownload from "js-file-download";
import { setAlert } from "./alert";

// GET ALL PAYMENTS DONE WITH CREDIT CARDS
export const getCcPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/activity/cc-payments");

    dispatch({ type: actionTypes.CCPAYMENTS_LOADED, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
    dispatch({ type: actionTypes.CCPAYMENTS_ERROR });
  }
};

// GET ALL BANKS
export const getBanks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/banks");
    dispatch({ type: actionTypes.GET_BANKS, banks: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  }
};

// GENERATE REPORT
export const generateReport = (values) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/admin/reports/${values.reportType}`, values, { responseType: "arraybuffer" });
    const fileName = res.headers["content-disposition"].split("=")[1].replace("_", "");

    fileDownload(res.data, fileName);
    return true;
  } catch (error) {
    const { message } = JSON.parse(Buffer.from(error.response.data).toString("utf8"));
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return false;
  }
};
