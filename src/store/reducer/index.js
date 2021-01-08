import { combineReducers } from 'redux';
import { activities } from './activity.reducer';
import { alert } from './alert.reducer';
import { authentication } from './auth.reducer';
import { check } from './check.reducer';
import { loadingReducer } from './loading.reducer';
import { posts } from './posts.reducer';
import { registration } from './register.reducer';
import { stories } from './stories.reducer';
import { hashtag } from './hashtag.reducer';



const appReducer = combineReducers({
  authentication,
  registration,
  alert,
  check,
  activities,
  stories,
  loadingReducer,
  posts,
  hashtag
});

const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;