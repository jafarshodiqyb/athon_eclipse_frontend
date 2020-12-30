import _ from 'lodash';
export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  console.log(actions,state)
  console.log(_(actions)
  .some((action) => _.get(state.loadingReducer, `${action}`)))
//   if(_(actions)
//   .some((action) => _.get(state.loadingReducer, `${action}`)))
  return _(actions)
    .some((action) => _.get(state.loadingReducer, `${action}`));
};