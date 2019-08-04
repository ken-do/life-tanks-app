import { MAKING_REQUEST, LIST_ACTIVITIES, CREATE_ACTIVITY, UPDATE_ACTIVITY, RETRIEVE_ACTIVITY  } from "./actionTypes";
import axios from "axios";

export const listActivities = () => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/activities')
            .then(response => {
                dispatch({
                    type: LIST_ACTIVITIES,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const createActivity = (values) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.post(process.env.REACT_APP_API_URL + '/activities', values)
            .then(response => {
                dispatch({
                    type: CREATE_ACTIVITY,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}
export const updateActivity = (id, values) => {
    return dispatch => {
        dispatch(makingRequest());
        return axios.put(process.env.REACT_APP_API_URL + '/activities/' + id, values)
            .then(response => {
                dispatch({
                    type: UPDATE_ACTIVITY,
                    payload: response.data
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const retrieveActivity = (id) => {
    console.log('id', id)
    return dispatch => {
        dispatch(makingRequest());
        return axios.get(process.env.REACT_APP_API_URL + '/activities/' + id)
            .then(response => {
                dispatch({
                    type: RETRIEVE_ACTIVITY,
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