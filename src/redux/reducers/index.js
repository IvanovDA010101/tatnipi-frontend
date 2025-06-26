import { combineReducers } from 'redux';
import authReducer from "./authReducer.js";
import taskReducer from "./taskReducer.js";



const rootReducer  = combineReducers({
    auth: authReducer,
    task: taskReducer,
});

export default rootReducer;
