import { combineReducers } from 'redux';
import alertsReducer from './alerts/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
});

export default rootReducer;
