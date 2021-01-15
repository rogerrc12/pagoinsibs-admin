import * as actionTypes from "../constants";

const initialState = {
  suppliers: [],
  profile: { profile: {}, banks: [], payments: [] },
  supplierAccount: {},
  error: "",
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.GET_SUPPLIERS_SUCCESS:
      return { ...state, suppliers: action.suppliers };
    case actionTypes.GET_SUPPLIER_PROFILE_SUCCESS:
      return { ...state, profile: action.profile };

    case actionTypes.GET_SUPPLIER_ACCOUNT_SUCCESS:
      return { ...state, supplierAccount: action.accountData };

    case actionTypes.GET_SUPPLIER_PROFILE_ERROR:
      return { ...state, profile: { information: {}, banks: [] } };

    case actionTypes.SUPPLIER_ERROR:
      return { ...state, error: action.msg };

    default:
      return state;
  }
}
