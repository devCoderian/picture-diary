import { all, fork, takeLatest, call, put } from 'redux-saga/effects'
import axios from "axios";
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from '../reducers/post';
function addPostAPI(data){
    return axios.post('/post', data);
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

function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, data)
}

function* addComment(action){
    const result = yield call(addCommentAPI, action.data);
    try {
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data:result.data
        }); 
    } catch (error) {
        console.error(error);
        yield put({ 
            type: ADD_COMMENT_FAILURE,
            data: error.response.data
        });
    }
}
function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`);
  }
  
  function* loadPosts(action) {
    try {
      const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data:result.data
        }); 
    } catch (error) {
        console.error(error);
        yield put({ 
            type: LOAD_POSTS_FAILURE,
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
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchLoadPosts(){
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchUploadImage),
        fork(watchAddComment),
        fork(watchLoadPosts),
    ])
}