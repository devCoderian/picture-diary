import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import axios from "axios";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from '../reducers/post';
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

function uploadImageAPI(data){
    return axios.post('/post/images', data); //form data는 {content: data} 이런식으로 감싸면 json이 되어버려서 감싸면 안된다.
}

function* uploadImage(action){
    const result = yield call(uploadImageAPI, action.data);
    try {
        yield put({
            type: UPLOAD_IMAGE_SUCCESS,
            data:result.data
        }); 
    } catch (error) {
        console.error(error);
        yield put({ 
            type: UPLOAD_IMAGE_FAILURE,
            data: error.response.data
        });
    }
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUploadImage(){
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchUploadImage),
    ])
}