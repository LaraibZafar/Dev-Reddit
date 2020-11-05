import axios from 'axios';

import authActionTypes from './auth.types';
import {setAlert} from '../alert-reducer/alert.actions';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = ()=> async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token); //set default token
    }
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: authActionTypes.USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type: authActionTypes.AUTH_ERROR
            })
        }
    }


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
        dispatch(loadUser());

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

//User Login
export const loginUser = ({email,password})=> async dispatch=>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const body = JSON.stringify({email,password});
    try {
        const res = await axios.post('/api/auth',body,config);
        dispatch({
            type: authActionTypes.LOGIN_SUCCESS,
            payload: res.data //auth token
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: authActionTypes.LOGIN_FAILURE
        })
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger',2000))
            });
        }
    }
}