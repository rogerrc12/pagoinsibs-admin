import * as actionTypes from "../constants";

// GET PRODUCTS
export const getProductsInit = () => ({
  type: actionTypes.GET_PRODUCTS_INIT,
});

export const getProducts = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  products,
});

export const getProductsError = () => ({
  type: actionTypes.GET_PRODUCTS_ERROR,
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

export const getSupplierProductsError = () => ({
  type: actionTypes.GET_SUPPLIER_PRODUCTS_ERROR,
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

// GET PRODUCT DATA
export const getProductDataInit = (id) => ({
  type: actionTypes.GET_PRODUCT_DATA_INIT,
  id,
});

export const getProductData = (productData) => ({
  type: actionTypes.GET_PRODUCT_DATA_SUCCESS,
  productData,
});

export const getProductDataError = () => ({
  type: actionTypes.GET_PRODUCT_DATA_ERROR,
});

export const editProductInit = (values, productId) => ({
  type: actionTypes.EDIT_PRODUCT_INIT,
  values,
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
