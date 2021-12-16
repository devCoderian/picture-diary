import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import axios from "axios";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from '../reducers/post';
function addPostAPI(data){
    return axios.post('/post', {content: data});
}

function* addPost(action){
    const result = yield call(addPostAPI, action.data); 
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            data:result.data
        });
    } catch (error) {
        console.error(error);
        yield put({ 
            type: ADD_POST_FAILURE,
            data: error.response.data
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
    ])
}