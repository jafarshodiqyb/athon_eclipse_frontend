import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './register.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { check } from './check.reducer';
import { activities } from './activity.reducer';
import { stories } from './stories.reducer';
import { loadingReducer } from "./loading.reducer";


const appReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  check,
  activities,
  stories,
  loadingReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USERS_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;