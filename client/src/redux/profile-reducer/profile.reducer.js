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
        console.log(action.payload);
      return {
        ...currentState,
        profile: action.payload,
        loading: false,
        
      };
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...currentState,
        error: action.payload,
        loading: false,
        profile: null,
        
      };
    default:
      return currentState;
  }
};

export default profile;
