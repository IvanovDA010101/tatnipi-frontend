import {authSaga} from "./authSaga.js";
import {taskSaga} from "./tasksSaga.js";
import {all} from "redux-saga/effects";
import {profileSaga} from "./profileSagas.js";


export default function* rootSaga() {
    yield all([authSaga(), taskSaga(), profileSaga()]);
}
