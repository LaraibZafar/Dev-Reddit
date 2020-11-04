import authActionTypes from './auth.types';

const INITIAL_STATE={
    token: localStorage.getItem('token'), //Initially null, eventually will be returned by the back-end
    isAuthenticated: null, //when we get a success response from login/register 
    loading: true, //we haven't gotten the authentication response from the back-end
    user: null
};

const auth = (currentState= INITIAL_STATE,action)=>{
    switch(action.type){
        case authActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...currentState,
                ...action.payload,
                isAuthenticated:true,
                loading:false
            }
        case authActionTypes.REGISTER_FAILURE:
            localStorage.removeItem('token');
            return {
                ...currentState,
                token:null,
                isAuthenticated:false,
                loading:false
            }
        default:
            return currentState;
    }
}

export default auth;