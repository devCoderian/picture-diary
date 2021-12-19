import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DiaryForm from '../components/DiaryForm';
import DiaryPost from '../components/DiaryPost';
import Layout from '../components/Layout';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';


const Home = () =>{
        const dispatch = useDispatch();
        const { me } = useSelector((state) => state.user);
        const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);
        console.log(mainPosts)
      //getServerSideProps 이전
        useEffect(() => {
          dispatch({
            type: LOAD_USER_REQUEST,
          });
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }, []);
      
        useEffect(() => {
          function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
              if (hasMorePost && !loadPostsLoading) {
                dispatch({
                  type: LOAD_POSTS_REQUEST,
                  data: mainPosts[mainPosts.length - 1].id,
                });
              }
            }
          }
          window.addEventListener('scroll', onScroll);
          return () => {
            window.removeEventListener('scroll', onScroll);
          };
        }, [mainPosts, hasMorePost, loadPostsLoading]);
      
    return (
        <Layout>
            {me && <DiaryForm />}
            {mainPosts.map((c) => (
              <DiaryPost key={c.id} post={c} />
            ))}
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