import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';

// Config options to customize persisted state include:
// whitelist, blacklist, stateReconciler
const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
