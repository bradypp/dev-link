import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sectionReducer from './section/reducer';

// Config options to customize persisted state include:
// whitelist, blacklist, stateReconciler
const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    section: sectionReducer,
});

export default persistReducer(persistConfig, rootReducer);
