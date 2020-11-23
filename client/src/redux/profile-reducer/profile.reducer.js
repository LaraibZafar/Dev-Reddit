import { profileActionTypes } from "./profile.types";
const INITIAL_STATE = {
  profile: null, //My profile
  profiles: [], //for viewing other user's profile
  repos: [], //github repos
  loading: true,
  error: {},
};

const profile = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case profileActionTypes.GET_PROFILE:
    case profileActionTypes.UPDATE_PROFILE:
      return {
        ...currentState,
        profile: action.payload,
        loading: false,
      };
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...currentState,
        error: action.payload,
        profile: null,
        loading: false,
      };
    case profileActionTypes.CLEAR_PROFILE:
      return {
        ...currentState,
        profile: null,
        loading: true,
        repos: [],
      };
    default:
      return currentState;
  }
};

export default profile;
