import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
