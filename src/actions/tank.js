import { MAKING_REQUEST, LIST_TANKS, CREATE_TANK, RETRIEVE_TANK, UPDATE_TANK, DELETE_TANK, BOOST_TANK } from "./actionTypes";

import axios from "axios";

export const createTank = (values) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.post(process.env.REACT_APP_API_URL + '/tanks', values)
            .then(response => {
                dispatch({
                    type: CREATE_TANK,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}
export const updateTank = (id, values) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.put(process.env.REACT_APP_API_URL + '/tanks/' + id, values)
            .then(response => {
                dispatch({
                    type: UPDATE_TANK,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const listTanks = () => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/tanks')
            .then(response => {
                dispatch({
                    type: LIST_TANKS,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const retrieveTank = (id) => {
    console.log('id', id)
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/tanks/' + id)
            .then(response => {
                dispatch({
                    type: RETRIEVE_TANK,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}



export const deleteTank = (id) => {
    console.log(id)
    return dispatch => {
        dispatch(makingRequest());
        return axios.delete(process.env.REACT_APP_API_URL + '/tanks/' + id)
            .then(response => {
                dispatch({
                    type: DELETE_TANK,
                    id
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const boostTank = (data) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.post(process.env.REACT_APP_API_URL + '/boost-tanks', data)
            .then(response => {
                dispatch({
                    type: BOOST_TANK,
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