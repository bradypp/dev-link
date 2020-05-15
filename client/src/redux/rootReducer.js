import { combineReducers } from 'redux';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import profilesReducer from './profiles/reducer';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    profile: profileReducer,
    profiles: profilesReducer,
});

export default rootReducer;
