import * as actionTypes from '../actions/constants';

const initialState = {
  transfers: null,
  transfer_detail: {},
  pending_transfers: 0,
  cc_payments: null,
  cc_payment_detail: {},
  banks: []
}

export default function(state = initialState, action = {}) {
  const {type, payload} = action;

  switch(type) {
    // CC PAYMENTS
    case actionTypes.CCPAYMENTS_LOADED : return {...state, cc_payments: payload};
    case actionTypes.CCPAYMENTS_ERROR : return {...state, cc_payments: null}; 

    case actionTypes.GET_CCPAYMENT : return {...state, cc_payment_detail: payload}
    case actionTypes.GET_CCPAYMENT_ERROR :return {...state, cc_payment_detail: {}}

    case actionTypes.GET_BANKS : return {...state, banks: action.banks}

    default :
      return state;
  }
};