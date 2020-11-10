import { combineReducers } from "redux";

import alert from './alert-reducer/alert.reducer';
import auth from './auth-reducer/auth.reducer';
import profile from './profile-reducer/profile.reducer';

export default combineReducers({
    alert,
    auth,
    profile,
});