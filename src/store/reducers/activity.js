import * as actionTypes from "../constants";

const initialState = {
  transfers: null,
  transfer_detail: {},
  pending_transfers: 0,
  cc_payments: null,
  cc_payment_detail: {},
  banks: [],
  currencies: [],
  currencyData: {},
  error: "",
};

export default function (state = initialState, action = {}) {
  const { type } = action;

  switch (type) {
    case actionTypes.GET_BANKS_SUCCESS:
      return { ...state, banks: action.banks };
    case actionTypes.GET_BANKS_ERROR:
      return { ...state, banks: [] };

    case actionTypes.GET_CURRENCIES_SUCCESS:
      return { ...state, currencies: action.currencies };

    case actionTypes.GET_CURRENCY_SUCCESS:
      return { ...state, currencyData: action.currencyData };

    case actionTypes.CURRENCY_ERROR:
      return { ...state, error: action.msg };

    default:
      return state;
  }
}
