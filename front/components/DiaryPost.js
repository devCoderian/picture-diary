import React from 'react'
import styled from "styled-components";
import Comment from './Comment';
import DiaryForm from './DiaryForm';
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
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 30px;
}
.img-box {
  width: 60%;
  border-radius: 10px 0px 0px 10px;
  height: 400px;
  position: relative;
}
.img-box img{
  border-radius: 10px 0px 0px 10px;
  width: 100%;
  height: 100%;
  object-fit: none
  
}
.text-box {
  width:40%;
}
.content {
  width: 75%;
  height: 20%;
  position: absolute;
  bottom: 40px;
  right: 50px;
  background: rgba(240, 240, 240, 0.7);
  border-radius:5px;
}

.content div{
  margin:5px 10px;
}
`
function DiaryPost() {
    return (
      <>
      <DiaryForm />
      <StyledDiray>
     
        <div class="header">
          <h1>👁️‍🗨️ 다른 사람의 일기가 궁금한가요?</h1>
        </div>
        {Array.from({ length: 2 }).map((_, idx) => (
              <section class ="post">
              <div className ="img-box">
              <img src ='/image/ediya.png' alt= "그림"/>
              {/* <div className = "content"><div>오늘 순호랑 치킨 먹어요</div></div> */}
              </div>
              <div className ="text-box">
                <Comment /> 
              </div>
              </section>
        ))}
        </StyledDiray>
      </>
    )
}

export default DiaryPost
