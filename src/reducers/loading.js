import { SET_LOADING, REMOVE_LOADING } from '../actions/constants';
const initialState = { loading: false };

export default function(state = initialState, action = {}) {
  const { type } = action;

  switch(type) {
    case SET_LOADING :
      return { loading: true };
    case REMOVE_LOADING :
      return { loading: false };
    default :
      return state;
  }
}