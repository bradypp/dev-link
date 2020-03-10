import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';

// Config options include whitelist, blacklist, stateReconciler
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'profile'],
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
