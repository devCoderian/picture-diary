import produce from 'immer';
const initialState = {
    mainPosts: [],
}

//리듀서란 이전 상태를 액션을 통해 다름 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type){
        default:
            return state;
    }
});

export default reducer;