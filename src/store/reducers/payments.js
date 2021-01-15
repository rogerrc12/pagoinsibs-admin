import * as types from "../constants";

const initialState = {
  pendingPayments: [],
  processingPayments: [],
  allPayments: [],
  paymentDetails: {},
  pendingCount: 0,
  count: 0,
  error: "",
  processing: false,
  loading: true,
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        allPayments: payload.allPayments,
        pendingPayments: payload.pending,
        processingPayments: payload.processing,
        count: payload.allPayments.length,
        pendingCount: payload.pending.length,
      };

    case types.GET_PAYMENT_DETAILS_SUCCESS:
      return { ...state, paymentDetails: action.details };

    case types.PROCESS_PAYMENT_INIT:
    case types.CANCEL_PAYMENT_INIT:
      return { ...state, processing: true };
    case types.PROCESS_PAYMENT_SUCCESS:
    case types.CANCEL_PAYMENT_SUCCESS:
      return { ...state, processing: false };

    case types.GET_PENDING_PAYMENTS_COUNT:
      return { ...state, pending_payments_count: payload };
    case types.GET_PENDING_PAYMENTS_COUNT_ERROR:
      return { ...state, pending_payments_count: 0 };

    case types.PAYMENTS_ERROR:
      return { ...state, error: action.msg, processing: false, loading: false };

    case types.CLEAR_PAYMENTS_ERROR:
      return { ...state, error: "" };

    default:
      return state;
  }
}
