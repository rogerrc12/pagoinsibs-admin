import * as actionTypes from "../constants";

// GET PRODUCTS
export const getProductsInit = () => ({
  type: actionTypes.GET_PRODUCTS_INIT,
});

export const getProducts = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  products,
});

// GET PRODUCTS BY SUPPLIER ID
export const getSupplierProductsInit = (supplierId) => ({
  type: actionTypes.GET_SUPPLIER_PRODUCTS_INIT,
  supplierId,
});

export const getSupplierProducts = (supplierProducts) => ({
  type: actionTypes.GET_SUPPLIER_PRODUCTS_SUCCESS,
  supplierProducts,
});

// ADD NEW PRODUCT
export const addProductInit = (values, supplierId) => ({
  type: actionTypes.ADD_PRODUCT_INIT,
  values,
  supplierId,
});

// GET PRODUCT DATA
export const getProductDataInit = (id) => ({
  type: actionTypes.GET_PRODUCT_DATA_INIT,
  id,
});

export const getProductData = (productData) => ({
  type: actionTypes.GET_PRODUCT_DATA_SUCCESS,
  productData,
});

export const editProductInit = (values, productId) => ({
  type: actionTypes.EDIT_PRODUCT_INIT,
  values,
  productId,
});

// DELETE PRODUCT
export const deleteProductInit = (supplierId, productId) => ({
  type: actionTypes.DELETE_PRODUCT_INIT,
  supplierId,
  productId,
});

export const productsError = (msg) => ({
  type: actionTypes.PRODUCTS_ERROR,
  msg,
});
