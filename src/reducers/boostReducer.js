import { LIST_BOOSTS, CREATE_BOOST, RETRIEVE_BOOST, DELETE_BOOST } from "../actions/actionTypes";

export default (state=[], action) => {
    let newState;
    switch(action.type){
        case LIST_BOOSTS:
            return action.payload
        case CREATE_BOOST:
        case RETRIEVE_BOOST:
            newState = state.slice(); 
            newState.push(action.payload);
            return newState;
        case DELETE_BOOST:
            return state.filter(BOOST => BOOST.id !== action.id)
        default:
            return state;    
    }
}