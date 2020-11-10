import axios from "axios";

import alertActionTypes from "../alert-reducer/alert.types";
import { profileActionTypes } from "./profile.types";

//Get Current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/myProfile"); //we don't need to pass a token
    //because we pass the token by default
    //because of the auth/setAuthToken
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
