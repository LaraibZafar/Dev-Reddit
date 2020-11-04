import alertActionTypes from "./alert.types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (message, alertType, displayTime) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: alertActionTypes.SET_ALERT,
    payload: { id, message, alertType },
  });
  setTimeout(
    () => dispatch({ type: alertActionTypes.REMOVE_ALERT, payload: id }),
    displayTime=3000
  );
};
