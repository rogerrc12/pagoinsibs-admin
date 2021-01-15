import * as actionTypes from "../constants";

export const getSuppliersInit = () => ({
  type: actionTypes.GET_SUPPLIERS_INIT,
});

export const getSuppliers = (suppliers) => ({
  type: actionTypes.GET_SUPPLIERS_SUCCESS,
  suppliers,
});

export const getSuppliersError = () => ({
  type: actionTypes.GET_SUPPLIERS_ERROR,
});

// Get supplier information by id
export const getSupplierProfileInit = (supplierId) => ({
  type: actionTypes.GET_SUPPLIER_PROFILE_INIT,
  supplierId,
});

export const getSupplierProfile = (profile) => ({
  type: actionTypes.GET_SUPPLIER_PROFILE_SUCCESS,
  profile,
});

export const getSupplierProfileError = () => ({
  type: actionTypes.GET_SUPPLIER_PROFILE_ERROR,
});

export const addSupplierInit = (values) => ({
  type: actionTypes.ADD_SUPPLIER_INIT,
  values,
});

export const addSupplierSuccess = () => ({
  type: actionTypes.ADD_SUPPLIER_SUCCESS,
});

export const editSupplierInit = (values, id) => ({
  type: actionTypes.EDIT_SUPPLIER_INIT,
  values,
  id,
});

export const editSupplierSuccess = () => ({
  type: actionTypes.EDIT_SUPPLIER_SUCCESS,
});

// Add a bank account for a supplier
export const addSupplierAccountInit = (values, supplierId) => ({
  type: actionTypes.ADD_SUPPLIER_ACCOUNT_INIT,
  supplierId,
  values,
});

export const addSupplierAccount = () => ({
  type: actionTypes.ADD_SUPPLIER_ACCOUNT_SUCCESS,
});

export const addSupplierAccountError = () => ({
  type: actionTypes.ADD_SUPPLIER_ACCOUNT_ERROR,
});

export const getSupplierAccountInit = (supplierId) => ({
  type: actionTypes.GET_SUPPLIER_ACCOUNT_INIT,
  supplierId,
});

export const getSupplierAccount = (accountData) => ({
  type: actionTypes.GET_SUPPLIER_ACCOUNT_SUCCESS,
  accountData,
});

export const getSupplierAccountError = () => ({
  type: actionTypes.GET_SUPPLIER_ACCOUNT_ERROR,
});

export const deleteSupplierInit = (supplier) => ({
  type: actionTypes.DELETE_SUPPLIER_INIT,
  supplier,
});

export const deleteSupplierSuccess = () => ({
  type: actionTypes.DELETE_SUPPLIER_SUCCESS,
});

export const supplierError = (msg) => ({
  type: actionTypes.SUPPLIER_ERROR,
  msg,
});
