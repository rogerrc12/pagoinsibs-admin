import * as actionTypes from '../constants';

const initialState = {
  products: {
    onePaymentProducts: [],
    directDebitProducts: [],
  },
  supplierProducts: [],
  productData: {},
  error: '',
};

export default function productsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products };

    case actionTypes.GET_SUPPLIER_PRODUCTS_SUCCESS:
      return { ...state, supplierProducts: action.supplierProducts };

    case actionTypes.GET_PRODUCT_DATA_SUCCESS:
      return { ...state, productData: action.productData };

    case actionTypes.PRODUCTS_ERROR:
      return { ...state, error: action.msg };
    default:
      return state;
  }
}
