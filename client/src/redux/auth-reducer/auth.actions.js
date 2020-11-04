import axios from 'axios';

import authActionTypes from './auth.types';
import {setAlert} from '../alert-reducer/alert.actions';

//User Registeration
export const registerUser = ({name,email,password})=> async dispatch=>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const body = JSON.stringify({name,email,password});
    try {
        const res = await axios.post('/api/users',body,config);
        dispatch({
            type: authActionTypes.REGISTER_SUCCESS,
            payload: res.data //auth token
        });
    } catch (error) {
        dispatch({
            type: authActionTypes.REGISTER_FAILURE
        })
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger',2000))
            });
        }
    }
}