import { ACCPAYMENTS_LOADED, ACCPAYMENTS_ERROR, GET_PAYMENTS_COUNT, GET_PAYMENTS_COUNT_ERROR, GET_PENDING_PAYMENTS_COUNT, GET_PENDING_PAYMENTS_COUNT_ERROR, GET_ACCPAYMENT_DETAILS, GET_ACCPAYMENT_DETAILS_ERROR, PENDING_ACCPAYMENTS_LOADED } from '../actions/constants';

const initialState = {
  pending_acc_payments: [],
  acc_payments: [],
  acc_payment_detail: {},
  pending_payments_count: 0,
  payments_count: 0
}

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case ACCPAYMENTS_LOADED :
      return {...state, acc_payments: payload};
    case PENDING_ACCPAYMENTS_LOADED :
      return {...state, pending_acc_payments: payload};
    case ACCPAYMENTS_ERROR :
      return {...state, acc_payments: null};

    case GET_ACCPAYMENT_DETAILS :
      return {...state, acc_payment_detail: payload}
    case GET_ACCPAYMENT_DETAILS_ERROR :
      return {...state, acc_payment_detail: {}}

    case GET_PAYMENTS_COUNT :
      return {...state, payments_count: payload}
    case GET_PAYMENTS_COUNT_ERROR :
      return {...state, payments_count: 0}

    case GET_PENDING_PAYMENTS_COUNT :
      return {...state, pending_payments_count: payload}
    case GET_PENDING_PAYMENTS_COUNT_ERROR :
      return {...state, pending_payments_count: 0}

    default :
      return state;
  }
}