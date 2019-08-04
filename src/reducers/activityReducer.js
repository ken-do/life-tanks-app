import { LIST_ACTIVITIES, CREATE_ACTIVITY, RETRIEVE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY } from "../actions/actionTypes";

export default (state=[], action) => {
    let newState;
    switch(action.type){
        case LIST_ACTIVITIES:
            return action.payload
        case CREATE_ACTIVITY:
        case RETRIEVE_ACTIVITY:
            newState = state.slice(); 
            newState.push(action.payload);
            return newState;
        case DELETE_ACTIVITY:
            return state.filter(ACTIVITY => ACTIVITY.id !== action.id)
        default:
            return state;    
    }
}