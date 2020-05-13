import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import profilesReducer from './profiles/reducer';

// TODO: Decide on redux state to whitelist/blacklist
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['auth', 'profile', 'profiles', 'alerts'],
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    profile: profileReducer,
    profiles: profilesReducer,
});

export default persistReducer(persistConfig, rootReducer);
