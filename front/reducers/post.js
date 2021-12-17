import produce from 'immer';
const initialState = {
    mainPosts: [],
    imagePath: [],
    hasMorePosts: true,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    uploadImageLoading: false,
    uploadImageDone: false,
    uploadImageError: null,
}

//ACTION
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

//이미지 업로드
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';


//리듀서란 이전 상태를 액션을 통해 다름 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type){
        case ADD_POST_REQUEST:
            draft.addPostDone = false;
            draft.addPostError = null;
            draft.addPostLoading = true;
        case ADD_POST_SUCCESS:
            draft.addPostDone = true;
            draft.addPostError = null;
            draft.addPostLoading = false;
            draft.mainPosts.unshift(action.data);
            draft.imagePath = [];
        case ADD_POST_FAILURE:
            draft.addPostError = action.error;
            draft.addPostLoading = false;
        case UPLOAD_IMAGE_REQUEST:
            draft.uploadImageDone = false;
            draft.uploadImageError = null;
            draft.uploadImageLoading = true;
        case UPLOAD_IMAGE_SUCCESS:
            draft.uploadImageDone = true;
            draft.uploadImageError = null;
            draft.uploadImageLoading = false;
            draft.imagePath = action.data;
        case UPLOAD_IMAGE_FAILURE:
            draft.uploadImageError = action.error;
            draft.uploadImageLoading = false;
        default:break;
    }
});

export default reducer;