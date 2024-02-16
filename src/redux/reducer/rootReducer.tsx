import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from './Register';
import loginReducer from './Login';
import leadReducer from './Leads';
import loadReducer from './Loader';
import stripeReducer from './stripe';
import historyReducer from './Leadhistory';

const rootReducer = combineReducers({
  register: registerReducer,
  stripe: stripeReducer,
  login: loginReducer,
  leads: leadReducer,
  history: historyReducer,
  loading: loadReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
