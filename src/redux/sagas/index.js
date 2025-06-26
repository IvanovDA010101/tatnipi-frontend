import {authSaga} from "./authSaga.js";
import {taskSaga} from "./tasksSaga.js";
import {all} from "redux-saga/effects";


export default function* rootSaga() {
    yield all([authSaga(), taskSaga()]);
}
