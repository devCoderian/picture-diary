import React, { useCallback, useState } from 'react'
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Comment from './Comment';
import DiaryForm from './DiaryForm';
import DiaryPostImage from './DiaryPostImage';
import FollowButton from './FollowButton';
const StyledDiray = styled.div`
.header{
  margin-bottom: 15px;
  border-bottom: 1px solid lightgray;
}
.header h1{
  font-size: 14px;
  margin: 10px 5px;
}

.post{
  display:flex;
  height: 450px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 30px;
}
.img-box {
  width: 60%;
  border-radius: 10px 0px 0px 10px;
  height: 450px;
  position: relative;
}
.img-box img{
  border-radius: 0px 0px 0px 10px;
  width: 100%;
  height: 80%;
  object-fit: none
  
}
.text-box {
  width:40%;
}
.content {
  width: 100%;
  height: 20%;
  background: rgba(240, 240, 240, 0.7);
  padding:10px 15px;
}
`

// position: absolute;
// bottom: 40px;
// right: 50px;
function DiaryPost({post}) {

  return (
      <>
      <StyledDiray>
     
        <div className="header">
          <h1>👁️‍🗨️ 다른 사람의 일기가 궁금한가요?</h1>
        </div>
 
            <section className ="post" key = {'post'+post.id}>
            <div className ="img-box">
              <div className = "content">
                <FollowButton post = {post}/>
                {/* <div className="content-text">제목</div> */}
              </div>
              <DiaryPostImage post = {post}/>
              {/* <img role = "presentation" src ='/image/ediya.png' alt= "그림" onClick = {onZoom}/>
              <div className = "heart"><BsHeart /></div>
              {imgZoom && <ImgZoom image = {image} onClose= {onClose} />} */}
            </div>
            <div className ="text-box">
              <Comment post = {post}/> 
            </div>
          </section>
             
        {/* ))} */}
        </StyledDiray>
      </>
    )
}

export default DiaryPost
