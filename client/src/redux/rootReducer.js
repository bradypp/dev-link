import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import alertsReducer from './alerts/reducer';
import authReducer from './profile/auth/reducer';
import errorsReducer from './errors/reducer';
import profileReducer from './profile/reducer';
import postsReducer from './posts/reducer';

// TODO: Decide on redux state to whitelist/blacklist
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    errors: errorsReducer,
    posts: postsReducer,
    profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
