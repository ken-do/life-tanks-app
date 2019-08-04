import { MAKING_REQUEST, LIST_BOOSTS, DELETE_BOOST, RETRIEVE_BOOST } from "./actionTypes";
import axios from "axios";

export const listBoosts = () => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/boosts')
            .then(response => {
                dispatch({
                    type: LIST_BOOSTS,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const deleteBoost = (id) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.delete(process.env.REACT_APP_API_URL + '/boosts/' + id)
            .then(response => {
                dispatch({
                    type: DELETE_BOOST,
                    id
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}



export const retrieveBoost = (id) => {
    console.log('id', id)
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/boosts/' + id)
            .then(response => {
                dispatch({
                    type: RETRIEVE_BOOST,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}



const makingRequest = () => {
    return {
        type: MAKING_REQUEST
    }
}