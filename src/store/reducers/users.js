import {
  GET_USERS,
  GETUSERS_ERROR,
  PROFILE_DATA,
  PROFILE_ERROR,
  EDIT_USER,
  EDIT_USER_ERROR,
  GET_SUBSCRIBERS,
  GETSUBSCRIBERS_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  ADD_USER,
  ADD_USER_ERROR,
  GET_USER,
  GET_USER_ERROR,
} from "..//constants";

const initialState = {
  subscribers: [],
  users: [],
  profile: { information: {}, accounts: [], payments: [] },
  userInfo: {},
};

export default function (state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
    case ADD_USER:
    case EDIT_USER:
    case DELETE_USER:
      return { ...state, users: payload };
    case GET_USER:
      return { ...state, userInfo: payload };
    case GET_SUBSCRIBERS:
      return { ...state, subscribers: payload };
    case GETUSERS_ERROR:
      return { ...state, users: [] };
    case GET_USER_ERROR:
      return { ...state, userInfo: {} };
    case GETSUBSCRIBERS_ERROR:
      return { ...state, subscribers: [] };
    case PROFILE_DATA:
      return { ...state, profile: payload };
    case PROFILE_ERROR:
      return { ...state, profile: { information: {}, bank_accounts: { to_send: [], to_receive: [] }, transactions: [] } };
    case DELETE_USER_ERROR:
    case ADD_USER_ERROR:
    case EDIT_USER_ERROR:
      return { ...state };
    default:
      return state;
  }
}
