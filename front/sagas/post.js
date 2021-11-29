import { all, fork, takeLatest } from 'redux-saga/effects'
import axios from "axios";
function loginAPI(data){
    return axios.get('/', data);
}

function* logIn(action){
    const result = yield call(loginAPI, action.data); 
    try {
        yield put({
            type: 'LOGIN_SUCCEESS',
            data: result.data
        });
    } catch (error) {
        console.error(error);
        yield put({ 
            type: 'LOGIN_FAILURE',
            data: error.response.data
        });
    }
}

// function* watchLogin(){  
//     yield takeLatest('LOG_IN_REQUEST', logIn); 
// }

export default function* postSaga(){
    yield all([
    ])
}