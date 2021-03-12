import {
  GET_USERS_SUCCESS,
  PROFILE_DATA,
  GET_SUBSCRIBERS_SUCCESS,
  USERS_ERROR,
  ADD_USER_SUCCESS,
  ADD_USER_INIT,
  GET_USERS_INIT,
  GET_USER_DATA_SUCCESS,
  EDIT_USER_INIT,
  GET_SUBSCRIBERS_INIT,
  SUBSCRIBERS_ERROR,
  GET_SUBS_PROFILE_SUCCESS,
} from '../constants';

const initialState = {
  subscribers: [],
  profile: { information: {}, accounts: [], payments: [] },
  adminUsers: [],
  userInfo: {},
  isLoading: true,
  isProcessing: false,
  error: '',
};

export default function usersReducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER_INIT:
    case GET_USERS_INIT:
    case EDIT_USER_INIT:
    case GET_SUBSCRIBERS_INIT:
      return { ...state, isLoading: true };

    case GET_USERS_SUCCESS:
      return { ...state, adminUsers: action.users, isLoading: false };

    case ADD_USER_SUCCESS:
      return { ...state, isProcessing: false, isLoading: false };

    case GET_USER_DATA_SUCCESS:
      return { ...state, userInfo: action.data };
    case GET_SUBSCRIBERS_SUCCESS:
      return { ...state, subscribers: action.subscribers, isLoading: false };
    case GET_SUBS_PROFILE_SUCCESS:
      return { ...state, profile: action.profile };
    case PROFILE_DATA:
      return { ...state, profile: payload };
    case USERS_ERROR:
    case SUBSCRIBERS_ERROR:
      return { ...state, error: action.msg, isLoading: false };
    default:
      return state;
  }
}
