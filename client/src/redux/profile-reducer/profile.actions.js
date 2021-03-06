import axios from "axios";

import { setAlert } from "../alert-reducer/alert.actions";
import { profileActionTypes } from "./profile.types";

//Get Current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/myProfile"); //we don't need to pass a token
    //because we pass the token by default
    //because of the auth/setAuthToken
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
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

export const createProfile = (formData, history, edit) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile/", formData, config);
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? "Profile Updated" : "Profile Created", "success", 1000)
    );
    if (!edit) {
      history.push("/dashboard"); // we can't use Redirect because we aren't writing jsx
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger", 2000));
      });
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success", 1000));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger", 2000));
      });
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success", 1000));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger", 2000));
      });
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
