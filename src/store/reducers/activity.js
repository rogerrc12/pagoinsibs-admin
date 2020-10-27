import * as actionTypes from "../constants";

const initialState = {
  transfers: null,
  transfer_detail: {},
  pending_transfers: 0,
  cc_payments: null,
  cc_payment_detail: {},
  banks: [],
  currencies: [],
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    // CC PAYMENTS
    case actionTypes.CCPAYMENTS_LOADED:
      return { ...state, cc_payments: payload };
    case actionTypes.CCPAYMENTS_ERROR:
      return { ...state, cc_payments: null };

    case actionTypes.GET_CCPAYMENT:
      return { ...state, cc_payment_detail: payload };
    case actionTypes.GET_CCPAYMENT_ERROR:
      return { ...state, cc_payment_detail: {} };

    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: action.banks };
    case actionTypes.GET_BANKS_ERROR:
      return { ...state, banks: [] };

    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };
    case actionTypes.GET_CURRENCIES_ERROR:
      return { ...state, currencies: [] };

    default:
      return state;
  }
}
