import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
