import * as actionTypes from "../constants";

const initialState = {
  suppliers: [],
  products: [],
  profile: { profile: {}, banks: [], payments: [] },
  productData: {},
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_SUPPLIERS:
    case actionTypes.DELETE_SUPPLIER:
      return { ...state, suppliers: payload };
    case actionTypes.GET_SUPPLIER_PROFILE:
    case actionTypes.ADD_SUPPLIER_ACCOUNT:
      return { ...state, profile: payload };

    case actionTypes.GET_PRODUCTS_SUCCESS:
    case actionTypes.ADD_PRODUCT_SUCCESS:
    case actionTypes.EDIT_PRODUCT_SUCCESS:
      return { ...state, products: payload };
    case actionTypes.GET_PRODUCTS_ERROR:
      return { ...state, products: [] };

    case actionTypes.GET_PRODUCT_DATA_SUCCESS:
      return { ...state, productData: payload };
    case actionTypes.GET_PRODUCT_DATA_ERROR:
      return { ...state, productData: {} };

    case actionTypes.SUPPLIER_PROFILE_ERROR:
      return { ...state, profile: { information: {}, banks: [] } };
    case actionTypes.GETSUPPLIERS_ERROR:
      return { ...state, suppliers: [] };

    case actionTypes.DELETE_SUPPLIER_ERROR:
    case actionTypes.DELETE_PRODUCT_ERROR:
    case actionTypes.EDIT_PRODUCT_ERROR:
    case actionTypes.ADD_SUPPLIER_ACCOUNT_ERROR:
    case actionTypes.ADD_PRODUCT_ERROR:
      return { ...state };
    default:
      return state;
  }
}
