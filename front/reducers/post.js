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
    loadPostsLoading : false,
    loadPostsDone : false,
    loadPostsError : null,
}

//ACTION
//포스팅 업로드
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

//포스트 불러오기
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

//이미지 업로드
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

//이미지 viewer에서 지우기
export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST';

//댓글 업로드
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';



//리듀서란 이전 상태를 액션을 통해 다름 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type){
        case ADD_COMMENT_REQUEST: {
            draft.addCommentDone = false; 
            draft.addCommentError = null;
            draft.addCommentLoading = true;
            break;
        }
        case ADD_COMMENT_SUCCESS: {
            console.log(action.data.PostId)
            const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
            post.Comments.unshift(action.data);
            draft.addCommentDone = true; 
            draft.addCommentError = null;
            draft.addCommentLoading = false;
            break;
            
        }
        case ADD_COMMENT_FAILURE:  {
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        }
        case ADD_POST_REQUEST:{
            draft.addPostDone = false;
            draft.addPostError = null;
            draft.addPostLoading = true;
            break;
        }
        case ADD_POST_SUCCESS:{
            draft.addPostDone = true;
            draft.addPostError = null;
            draft.addPostLoading = false;
            draft.mainPosts.unshift(action.data);
            draft.imagePath = [];
            break;
        }
        case ADD_POST_FAILURE:{
            draft.addPostError = action.error;
            draft.addPostLoading = false;
            break;
        }
        case UPLOAD_IMAGE_REQUEST:{
            draft.uploadImageDone = false;
            draft.uploadImageError = null;
            draft.uploadImageLoading = true;
            break;
        }
        case UPLOAD_IMAGE_SUCCESS:{
            draft.uploadImageDone = true;
            draft.uploadImageError = null;
            draft.uploadImageLoading = false;
            draft.imagePath = action.data;
            break;
        }
        case UPLOAD_IMAGE_FAILURE:{
            draft.uploadImageError = action.error;
            draft.uploadImageLoading = false;
            break;
        }
        case REMOVE_IMAGE_REQUEST:{
            // draft.imagePath = draft.imagePath.filter((v, i)=> i !== action.data);
            draft.imagePath = [];
            break;
        }
        case LOAD_POSTS_REQUEST: {
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        }
        case LOAD_POSTS_SUCCESS: {
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.loadPostsError = null;
            break;
        }
        case LOAD_POSTS_FAILURE: {
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;
        }
        default:break;
    }
});

export default reducer;