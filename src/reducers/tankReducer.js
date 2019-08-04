import { LIST_TANKS, CREATE_TANK, RETRIEVE_TANK, UPDATE_TANK, DELETE_TANK, BOOST_TANK } from "../actions/actionTypes";

export default (state=[], action) => {
    let newState;
    switch(action.type){
        case LIST_TANKS:
            return action.payload
        case CREATE_TANK:
        case RETRIEVE_TANK:
            newState = state.slice(); 
            newState.push(action.payload);
            return newState;
        case BOOST_TANK:
            newState = state.filter(tank => tank.id !== action.payload.id)
            newState.unshift(action.payload)
            return newState
        case DELETE_TANK:
            return state.filter(tank => tank.id !== action.id)
        default:
            return state;    
    }
}