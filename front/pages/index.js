import React from 'react'
import DiaryPost from '../components/DiaryPost';
import Layout from '../components/Layout';

const Home = () =>{
/*
    useEffect(() => {
        function onScroll(){
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                if(hasMorePosts && !loadPostsLoading){
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll); 
        }
    }, [])
*/
    return (
        <Layout>
            <DiaryPost />
        </Layout>
    );
};

//화면을 그리기 전 서버쪽에서 먼저 사용한다.
//HYDRATE란? getServerSideProps의 결과를 우선 HYDRATE로 보낸다.
/*
export const getServerSideProps = wrapper.getServerSideProps((context)=>{
    console.log(context);
    //useEffect쓸 필요 없음
    context.store.dispatch({
        type: LOAD_USER_REQUEST, 
    })
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST, 
    })
})
*/
export default Home;