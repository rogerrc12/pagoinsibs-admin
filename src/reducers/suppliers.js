import {  GET_SUPPLIERS,  GETSUPPLIERS_ERROR,  GET_SUPPLIER_PROFILE,  SUPPLIER_PROFILE_ERROR, DELETE_SUPPLIER, DELETE_SUPPLIER_ERROR, ADD_SUPPLIER_ACCOUNT, ADD_SUPPLIER_ACCOUNT_ERROR, GET_PRODUCTS, GET_PRODUCTS_ERROR, ADD_PRODUCT, ADD_PRODUCT_ERROR, EDIT_PRODUCT, DELETE_PRODUCT, DELETE_PRODUCT_ERROR, EDIT_PRODUCT_ERROR, GET_PRODUCT_DATA, GET_PRODUCT_DATA_ERROR } from '../actions/constants';

const initialState = {
  suppliers: [],
  products: [],
  profile: { profile: {}, banks: [], payments: [] },
  productData: {}
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case GET_SUPPLIERS :
    case DELETE_SUPPLIER :
      return {...state, suppliers: payload}
    case GET_SUPPLIER_PROFILE :
    case ADD_SUPPLIER_ACCOUNT :
      return {...state, profile: payload}

    case GET_PRODUCTS :
    case ADD_PRODUCT :
    case EDIT_PRODUCT :
    case DELETE_PRODUCT :
      return {...state, products: payload}
    case GET_PRODUCTS_ERROR :
      return {...state, products: []}

    case GET_PRODUCT_DATA :
      return {...state, productData: payload};
    case GET_PRODUCT_DATA_ERROR :
      return {...state, productData: {}};
      
    case SUPPLIER_PROFILE_ERROR :
      return {...state, profile: { information: {}, banks: [] }}
    case GETSUPPLIERS_ERROR :
      return {...state, suppliers: []}

    case DELETE_SUPPLIER_ERROR :
    case DELETE_PRODUCT_ERROR :
    case EDIT_PRODUCT_ERROR :
    case ADD_SUPPLIER_ACCOUNT_ERROR :
    case ADD_PRODUCT_ERROR :
      return {...state}
    default :
      return state;
  }
}