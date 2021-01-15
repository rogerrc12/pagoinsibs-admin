import * as types from "../constants";
const initialstate = {
  pendingDebits: [],
  processingDebits: [],
  allDebits: [],
  debit_detail: {},
  debit_fees: [],
  pendingCount: 0,
  count: 0,
  processing: false,
  loading: true,
  error: "",
};

export default function (state = initialstate, action = {}) {
  const { type } = action;

  switch (type) {
    case types.PROCESS_DEBIT_FEE_INIT:
    case types.CANCEL_DEBIT_INIT:
      return { ...state, processing: true };

    case types.PROCESS_DEBIT_FEE_SUCCESS:
    case types.CANCEL_DEBIT_SUCCESS:
      return { ...state, processing: false };

    case types.GET_DEBITS_SUCCESS:
      return {
        ...state,
        pendingDebits: action.pending,
        processingDebits: action.processing,
        allDebits: action.allDebits,
        count: action.allDebits.length,
        pendingCount: action.pending.length,
        loading: false,
      };

    case types.GET_DEBIT_DETAILS_SUCCESS:
      return { ...state, debit_detail: action.details, loading: false };

    case types.GET_DEBIT_FEES_SUCCESS:
      return { ...state, debit_fees: action.fees, loading: false };

    case types.DEBITS_ERROR:
      return { ...state, error: action.msg, processing: false, loading: false };
    case types.CLEAR_DEBITS_ERROR:
      return { ...state, error: "" };

    default:
      return state;
  }
}
