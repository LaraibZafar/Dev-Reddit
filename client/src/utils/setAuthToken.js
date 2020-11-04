//setting the default token
//so that we don't have to attach
//a token with every request
//it's already attached.
import axios from 'axios';

const setAuthToken = token=>{
    if(token){
        axios.defaults.headers.common['x-auth-token']=token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
