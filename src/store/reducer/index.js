import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './register.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { check } from './check.reducer';
import { activities } from './activity.reducer';
import { stories } from './stories.reducer';
import { loadingReducer } from "./loading.reducer";


const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  check,
  activities,
  stories,
  loadingReducer
});

export default rootReducer;