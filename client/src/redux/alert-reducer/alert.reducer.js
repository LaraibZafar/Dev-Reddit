import alertActionTypes from './alert.types';

const INITIAL_STATE=[];

const alertReducer=(currentState=INITIAL_STATE,action)=>{
    switch(action.type){
        case alertActionTypes.SET_ALERT:
            const alreadyExists = currentState.find(alert => alert.message===action.payload.message);
            if(alreadyExists)
            return [...currentState];
            return [...currentState,action.payload];
        case alertActionTypes.REMOVE_ALERT:
            return currentState.filter(alert => alert.id !== action.payload);
        default:
            return currentState;
    }
};

export default alertReducer;