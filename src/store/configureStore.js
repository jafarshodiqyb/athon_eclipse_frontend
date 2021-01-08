import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer/index';
import api from './middleware'

const loggerMiddleware = createLogger();

// export const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware,
//         api
//     )
// );


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware,loggerMiddleware, api)(createStore)

export const store = createStoreWithMiddleware(rootReducer)
