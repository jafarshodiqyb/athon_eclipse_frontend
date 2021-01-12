import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer/index';
import api from './middleware'

const loggerMiddleware = createLogger();


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore)

export const store = createStoreWithMiddleware(rootReducer)
