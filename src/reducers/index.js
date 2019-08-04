import { combineReducers } from 'redux'
import tankReducer from './tankReducer';
import activityReducer from './activityReducer';
import boostReducer from './boostReducer';
import requestReducer from './requestReducer';


export default combineReducers({
    activities: activityReducer,
    tanks: tankReducer,
    boosts: boostReducer,
    loading: requestReducer
})