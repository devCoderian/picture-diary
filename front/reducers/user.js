import produce from '../util/produce';
const initialState = {
    loadUserLoading: false, // 유저 정보 가져오기 시도중
    loadUserDone: false,
    loadUserError: null,
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,
    me: null,
    signUpData: {},
    loginData: {},
}


export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';


export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
  });
  
export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
});

//리듀서란 이전 상태를 액션을 통해 다름 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
    // return produce(state, (draft)=> {
    //     //state가 이름이 draft로 바뀌고 불변성을 안지켜도 된다.
    //     //return 안해줘도 된다.
    // });
        switch (action.type) {
            case REMOVE_FOLLOWER_REQUEST:
              draft.removeFollowerLoading = true;
              draft.removeFollowerError = null;
              draft.removeFollowerDone = false;
              break;
            case REMOVE_FOLLOWER_SUCCESS:
              draft.removeFollowerLoading = false;
              draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
              draft.removeFollowerDone = true;
              break;
            case REMOVE_FOLLOWER_FAILURE:
              draft.removeFollowerLoading = false;
              draft.removeFollowerError = action.error;
              break;
            case LOAD_FOLLOWINGS_REQUEST:
              draft.loadFollowingsLoading = true;
              draft.loadFollowingsError = null;
              draft.loadFollowingsDone = false;
              break;
            case LOAD_FOLLOWINGS_SUCCESS:
              draft.loadFollowingsLoading = false;
              draft.me.Followings = action.data;
              draft.loadFollowingsDone = true;
              break;
            case LOAD_FOLLOWINGS_FAILURE:
              draft.loadFollowingsLoading = false;
              draft.loadFollowingsError = action.error;
              break;
            case LOAD_FOLLOWERS_REQUEST:
              draft.loadFollowersLoading = true;
              draft.loadFollowersError = null;
              draft.loadFollowersDone = false;
              break;
            case LOAD_FOLLOWERS_SUCCESS:
              draft.loadFollowersLoading = false;
              draft.me.Followers = action.data;
              draft.loadFollowersDone = true;
              break;
            case LOAD_FOLLOWERS_FAILURE:
              draft.loadFollowersLoading = false;
              draft.loadFollowersError = action.error;
              break;
            case LOAD_USER_REQUEST:
              draft.loadUserLoading = true;
              draft.loadUserError = null;
              draft.loadUserDone = false;
              break;
            case LOAD_USER_SUCCESS:
              draft.loadUserLoading = false;
              draft.me = action.data;
              draft.loadUserDone = true;
              break;
            case LOAD_USER_FAILURE:
              draft.loadUserLoading = false;
              draft.loadUserError = action.error;
              break;
            case FOLLOW_REQUEST:
              draft.followLoading = true;
              draft.followError = null;
              draft.followDone = false;
              break;
            case FOLLOW_SUCCESS:
              draft.followLoading = false;
              draft.me.Followings.push({ id: action.data.UserId });
              draft.followDone = true;
              break;
            case FOLLOW_FAILURE:
              draft.followLoading = false;
              draft.followError = action.error;
              break;
            case UNFOLLOW_REQUEST:
              draft.unfollowLoading = true;
              draft.unfollowError = null;
              draft.unfollowDone = false;
              break;
            case UNFOLLOW_SUCCESS:
              draft.unfollowLoading = false;
              draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
              draft.unfollowDone = true;
              break;
            case UNFOLLOW_FAILURE:
              draft.unfollowLoading = false;
              draft.unfollowError = action.error;
              break;
            case LOG_IN_REQUEST:
              draft.logInLoading = true;
              draft.logInError = null;
              draft.logInDone = false;
              break;
            case LOG_IN_SUCCESS:
              console.log('LOG_IN_SUCCES',action.data);
              draft.logInLoading = false;
              draft.me = action.data;
              draft.logInDone = true;
              console.log(draft.me, 'me')
              break;
            case LOG_IN_FAILURE:
              draft.logInLoading = false;
              draft.logInError = action.error;
              break;
            case LOG_OUT_REQUEST:
              draft.logOutLoading = true;
              draft.logOutError = null;
              draft.logOutDone = false;
              break;
            case LOG_OUT_SUCCESS:
              draft.logOutLoading = false;
              draft.logOutDone = true;
              draft.me = null;
              break;
            case LOG_OUT_FAILURE:
              draft.logOutLoading = false;
              draft.logOutError = action.error;
              break;
            case SIGN_UP_REQUEST:
              draft.signUpLoading = true;
              draft.signUpError = null;
              draft.signUpDone = false;
              break;
            case SIGN_UP_SUCCESS:
              draft.signUpLoading = false;
              draft.signUpDone = true;
              break;
            case SIGN_UP_FAILURE:
              draft.signUpLoading = false;
              draft.signUpError = action.error;
              break;
            case CHANGE_NICKNAME_REQUEST:
              draft.changeNicknameLoading = true;
              draft.changeNicknameError = null;
              draft.changeNicknameDone = false;
              break;
            case CHANGE_NICKNAME_SUCCESS:
              draft.me.nickname = action.data.nickname;
              draft.changeNicknameLoading = false;
              draft.changeNicknameDone = true;
              break;
            case CHANGE_NICKNAME_FAILURE:
              draft.changeNicknameLoading = false;
              draft.changeNicknameError = action.error;
              break;
        default:break;
           
    };
});

export default reducer;