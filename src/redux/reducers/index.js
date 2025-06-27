import { combineReducers } from 'redux';
import authReducer from "./authReducer.js";
import taskReducer from "./taskReducer.js";
import profileReducer from "./profileReducer.js";



const rootReducer  = combineReducers({
    auth: authReducer,
    task: taskReducer,
    profile: profileReducer
});

export default rootReducer;
