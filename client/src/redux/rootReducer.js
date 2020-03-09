import { combineReducers } from 'redux';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    profile: profileReducer,
});

export default rootReducer;
