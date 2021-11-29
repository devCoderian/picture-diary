import { takeLatest, all, fork, call, put } from "redux-saga/effects";
import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_FAILURE, LOG_OUT_SUCCESS } from "../reducers/user";
import axios from "axios";

function loginAPI(data){
    return axios.post('/user/login', data);
}

function* login(action){ 
    try {
        const result = yield call(loginAPI, action.data); 
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        });
    } catch (error) {
        console.error(error);
        yield put({ 
            type: LOG_IN_FAILURE,
            data: error.response.data
        });
    }
    
}

function signupAPI(data){
    return axios.post('/user', data)
}
function* signup(action){
    try {
        const result = yield call(signupAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data
        })
    } catch (error) {
        console.error(error);
        yield put({
            type: SIGN_UP_FAILURE,
            data: error.response.data
        })
    }
}

function logoutAPI(){
    return axios.post('/user/logout');
}
function* logout(){
    try {
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        })
    }
}

function* watchLogin(){  
    yield takeLatest(LOG_IN_REQUEST, login); 
}
function* watchSignup(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

export default function* userSaga(){
    yield all([
        fork(watchSignup),
        fork(watchLogin),
        fork(watchLogout)
    ])
}