import * as actionTypes from "../constants";

const initialState = {
  products: {
    onePaymentProducts: [],
    directDebitProducts: [],
  },
  supplierProducts: [],
  productData: {},
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products };
    case actionTypes.GET_PRODUCTS_ERROR:
      return { ...state, products: [] };

    case actionTypes.GET_SUPPLIER_PRODUCTS_SUCCESS:
      return { ...state, supplierProducts: action.supplierProducts };
    case actionTypes.GET_SUPPLIER_PRODUCTS_ERROR:
      return { ...state, supplierProducts: [] };

    case actionTypes.GET_PRODUCT_DATA_SUCCESS:
      return { ...state, productData: action.productData };
    case actionTypes.GET_PRODUCT_DATA_ERROR:
      return { ...state, productData: {} };

    case actionTypes.DELETE_PRODUCT_ERROR:
    case actionTypes.EDIT_PRODUCT_ERROR:
    case actionTypes.ADD_PRODUCT_ERROR:
    default:
      return state;
  }
}
