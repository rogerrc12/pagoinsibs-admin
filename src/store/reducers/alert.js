import { SET_ALERT, CLOSE_ALERT } from '../constants';
const initialState = {
  iconType: '',
  open: false,
  message: '',
};

export default function alertReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return { ...state, message: payload.msg, iconType: payload.icon, open: true };
    case CLOSE_ALERT:
      return { ...state, open: false };
    default:
      return state;
  }
}
