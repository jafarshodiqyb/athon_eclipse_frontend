import { combineReducers } from 'redux';
import { activities } from './activity.reducer';
import { alert } from './alert.reducer';
import { authentication } from './auth.reducer';
import { check } from './check.reducer';
import { loadingReducer } from './loading.reducer';
import { posts } from './posts.reducer';
import { registration } from './register.reducer';
import { stories } from './stories.reducer';



const appReducer = combineReducers({
  authentication,
  registration,
  // users,
  alert,
  check,
  activities,
  stories,
  loadingReducer,
  posts
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USERS_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;