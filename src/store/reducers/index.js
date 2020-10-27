import { combineReducers } from 'redux';
import auth from './auth';
import activity from './activity';
import payments from './payments';
import debits from './debits';
import bankPayments from './bankPayments';
import users from './users';
import suppliers from './suppliers';
import alert from './alert';
import loading from './loading';

export default combineReducers({
  auth,
  activity,
  payments,
  debits,
  bankPayments,
  users,
  suppliers,
  alert,
  loading
});