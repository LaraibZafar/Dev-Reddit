import { combineReducers } from "redux";

import alert from './alert-reducer/alert.reducer';
import auth from './auth-reducer/auth.reducer';

export default combineReducers({
    alert,
    auth
});