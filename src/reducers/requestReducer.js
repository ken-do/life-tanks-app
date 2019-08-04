import { MAKING_REQUEST, FINISHED_REQUEST } from "../actions/actionTypes";

export default (state={ loading : false }, action) => {
    switch(action.type){
        case MAKING_REQUEST:
            return true
        default:
            return false
    }
}