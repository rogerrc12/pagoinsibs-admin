import { DEBITS_LOADED, DEBITS_ERROR, GET_PENDING_DEBITS, GET_PENDING_DEBITS_ERROR, GET_DEBIT_FEES, GET_DEBIT_FEES_ERROR, GET_DEBITS_COUNT, GET_PENDING_DEBITS_COUNT, GET_DEBITS_COUNT_ERROR, GET_DEBIT_DETAILS, GET_DEBIT_DETAILS_ERROR } from '../actions/constants';
const initialstate = {
  pending_debits: [],
  debits: [],
  debit_detail: {},
  debit_fees: [],
  pending_debits_count: 0,
  debits_count: 0
}

export default function(state = initialstate, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case DEBITS_LOADED :
      return {...state, debits: payload}
    case DEBITS_ERROR :
      return {...state, debits: []}

    case GET_PENDING_DEBITS :
      return {...state, pending_debits: payload};
    case GET_PENDING_DEBITS_ERROR :
      return {...state, pending_debits: []};

    case GET_DEBIT_DETAILS :
      return {...state, debit_detail: payload};
    case GET_DEBIT_DETAILS_ERROR :
      return {...state, debit_detail: {}};

    case GET_DEBITS_COUNT :
      return {...state, debits_count: payload};
    case GET_PENDING_DEBITS_COUNT :
      return {...state, pending_debits_count: payload};
    case GET_DEBITS_COUNT_ERROR :
      return {...state, debits_count: 0, pending_debits_count: 0};

    case GET_DEBIT_FEES :
      return {...state, debit_fees: payload};
    case GET_DEBIT_FEES_ERROR :
      return {...state, debit_fees: []};

    default :
      return state;
  }
}