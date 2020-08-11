import axios from "../helpers/axios";
import * as actionTypes from "./constants";
import { setAlert } from "./alert";
import fileDownload from "js-file-download";
import Swal from "sweetalert2";
import SweetAlert from "../components/UI/SweetAlert";

export const getBankPayments = (bank_id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.get(`/api/admin/bank-payments?bank_id=${bank_id}`);
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return dispatch({ type: actionTypes.GET_BANK_PAYMENTS, payload: res.data });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_LOADING });
    const message = error.response.data.message;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.GET_BANK_PAYMENTS_ERROR });
  }
};

export const generateCiserFile = (bank_id, history) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.get(`/api/admin/bank-payments/create-ciser?bank_id=${bank_id}`, {
      responseType: "blob",
      timeout: 30000,
    });

    const fileName = res.headers["x-suggested-filename"];

    fileDownload(res.data, !fileName ? `pagos para procesar_${new Date()}.xlsx` : fileName);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch(setAlert({ msg: "Archivo procesado correctamente", icon: "success" }));

    setTimeout(() => {
      history.push("/");
    }, 2000);
  } catch (error) {
    console.log(error);
    // const { message } = JSON.parse(Buffer.from(error.response.data).toString("utf8"));
    // if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    // return dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};

export const uploadSiserFile = ({ file, bank_id }) => async (dispatch) => {
  if (!file) return null;
  dispatch({ type: actionTypes.SET_LOADING });
  Swal.close();

  try {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post("/api/admin/bank-payments/process-ciser", data);

    dispatch({ type: actionTypes.REMOVE_LOADING });
    SweetAlert("Exitoso!", res.data.message, "success");
    return dispatch(getBankPayments(bank_id));
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.REMOVE_LOADING });
  }
};
