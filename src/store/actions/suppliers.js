import axios from "../../helpers/axios";
import * as actionTypes from "../constants";
import { setAlert } from "./alert";
import history from "../../helpers/history";
import SweetAlert from "../../components/UI/SweetAlert";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// Get All Suppliers
export const getSuppliers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/suppliers");

    dispatch({ type: actionTypes.GET_SUPPLIERS, payload: res.data });
  } catch (error) {
    const errors = error.response && error.response.data.errors;
    if (errors) dispatch(setAlert({ msg: error.msg, icon: "error" }));
    dispatch({ type: actionTypes.GETSUPPLIERS_ERROR });
  }
};

// Get supplier information by id
export const getSupplierProfile = (supplierid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/suppliers/profile/${supplierid}`);

    dispatch({ type: actionTypes.GET_SUPPLIER_PROFILE, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
    dispatch({ type: actionTypes.SUPPLIER_PROFILE_ERROR });
  }
};

// Add a new supplier
export const addSupplier = (supplierData) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const body = JSON.stringify(supplierData);
    const res = await axios.post("/api/admin/suppliers", body, config);

    SweetAlert("Exitoso", "Comercio agregado correctamente", "success");
    dispatch({ type: actionTypes.GET_SUPPLIERS, payload: res.data });

    return history.push("/suppliers");
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  }
};

export const editSupplier = (supplierData, id) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(supplierData);

  try {
    const res = await axios.put(`/api/admin/suppliers/${id}`, body, config);
    dispatch(setAlert({ msg: res.data.message, icon: "success" }));
    return history.push("/suppliers");
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      if (message) {
        dispatch(setAlert({ msg: message, icon: "error" }));
      } else {
        dispatch(setAlert({ msg: "Ha ocurrido un error inesperado, por  favor intenta más tarde.", icon: "error" }));
      }
    } else {
      dispatch(setAlert({ msg: "Ha ocurrido un error inesperado, por  favor intenta más tarde.", icon: "error" }));
    }
  }
};

// Add a bank account for a supplier
export const addBankAcc = (id, data) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify(data);
    const res = await axios.post(`/api/admin/suppliers/bank-account/${id}`, body, config);

    SweetAlert("Exitoso", res.data.message, "success");
    dispatch(getSupplierProfile(id));

    return true;
  } catch (error) {
    const { message } = error.response.data;
    if (message) SweetAlert("Error", message, "error");
    dispatch({ type: actionTypes.ADD_SUPPLIER_ACCOUNT_ERROR });
    return false;
  }
};

export const deleteSupplier = (supplier) => async (dispatch) => {
  try {
    const result = await MySwal.fire({
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
      const res = await axios.delete(`/api/admin/suppliers/${supplier.id}`);

      Swal.fire("Eliminado!", "El comercio ha sido eliminado correctamente.", "success");

      dispatch(setAlert({ msg: res.data.message, icon: "success" }));
      return dispatch(getSuppliers());
    }
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
    return dispatch({ type: actionTypes.DELETE_SUPPLIER_ERROR });
  }
};

// GET PRODUCTS
export const getProductsInit = (supplierId) => ({
  type: actionTypes.GET_PRODUCTS_INIT,
  supplierId,
});

export const getProducts = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsError = () => ({
  type: actionTypes.GET_PRODUCTS_ERROR,
});

// ADD NEW PRODUCT
export const addProductInit = (values, supplierId) => ({
  type: actionTypes.ADD_PRODUCT_INIT,
  values,
  supplierId,
});

export const addProduct = (products) => ({
  type: actionTypes.ADD_PRODUCT_SUCCESS,
  products,
});

export const addProductError = () => ({
  type: actionTypes.ADD_PRODUCT_ERROR,
});

// GET PRODUCT TO EDIT
export const getProductData = (id) => async (dispatch) => {
  if (!id) return null;

  try {
    const res = await axios.get(`/api/admin/products/data/${id}`);

    dispatch({ type: actionTypes.GET_PRODUCT_DATA_SUCCESS, payload: res.data });
  } catch (error) {
    const { message } = error.response.data;
    if (message) dispatch(setAlert({ msg: message, icon: "error" }));
  }
};

// EDIT PRODUCT MINIMUM AMOUNT
// export const editProduct = (data, supplier_id, product_id) => async (dispatch) => {
//   const config = { headers: { "Content-Type": "application/json" } };
//   const body = JSON.stringify(data);

//   try {
//     const res = await axios.put(`/api/admin/products/${supplier_id}/${product_id}`, body, config);
//     dispatch(setAlert({ msg: res.data.message, icon: "success" }));
//     dispatch(getProducts(supplier_id));
//     return true;
//   } catch (error) {
//     const errors = error.response && error.response.data.errors;
//     if (errors) dispatch(setAlert({ msg: errors[0].msg, icon: "error" }));
//     dispatch({ type: actionTypes.EDIT_PRODUCT_ERROR });
//     return false;
//   }
// };

export const editProductInit = (values, supplierId, productId) => ({
  type: actionTypes.EDIT_PRODUCT_INIT,
  values,
  supplierId,
  productId,
});

export const editProduct = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductError = () => ({
  type: actionTypes.EDIT_PRODUCT_ERROR,
});

// DELETE PRODUCT
export const deleteProductInit = (supplierId, productId) => ({
  type: actionTypes.DELETE_PRODUCT_INIT,
  supplierId,
  productId,
});

export const deleteProduct = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductError = () => ({
  type: actionTypes.DELETE_PRODUCT_ERROR,
});

// export const deleteProduct = (supplier_id, product_id) => async (dispatch) => {
//   try {
//     const result = await MySwal.fire({
//       title: "Estas seguro?",
//       text: `Eliminarás el producto seleccionado, esta acción no puede ser revertida.`,
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Si, eliminar!",
//       cancelButtonText: "Cancelar",
//     });

//     if (result.value) {
//       const res = await axios.delete(`/api/admin/products/${supplier_id}/${product_id}`);

//       Swal.fire("Exitoso!", "El producto ha sido eliminado correctamente.", "success");

//       dispatch(setAlert({ msg: res.data.message, icon: "success" }));
//       dispatch(getProducts(supplier_id));
//       return true;
//     }
//   } catch (error) {
//     const { message } = error.response.data;
//     if (message) dispatch(setAlert({ msg: message, icon: "error" }));
//     dispatch({ type: actionTypes.DELETE_PRODUCT_ERROR });
//     return false;
//   }
// };
