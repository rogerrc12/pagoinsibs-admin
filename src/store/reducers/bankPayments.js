import { GET_BANK_PAYMENTS, GET_BANK_PAYMENTS_ERROR } from '../constants';

const initialState = {
  bank_payments: [],
};

export default function bankPaymentsReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_BANK_PAYMENTS:
      return { ...state, bank_payments: payload };
    case GET_BANK_PAYMENTS_ERROR:
      return { ...state, bank_payments: [] };
    default:
      return state;
  }
}
