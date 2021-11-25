import React from 'react'
import styled from "styled-components";
import DiaryForm from './DiaryForm';
const StyledDiray = styled.div`
.post{
  display:flex;
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 30px;
}
.img-box {
  width: 60%;
  background: lightgray;
  height: 400px;
}
.img-box img{
  width: 100%;
  height: 100%;
  object-fit: none
}
.text-box {
  width: 30%;
}
`
function DiaryPost() {
    return (
      <>
      <DiaryForm />
        {Array.from({ length: 2 }).map((_, idx) => (
          // <Row>
            <StyledDiray>
              <section class ="post">
              <div className ="img-box">
              {/* <img src={ExImage} alt='이미지 테스트' /> */}
              <img src ='/image/ediya.png' alt= "그림"/>
              </div>
              <div className ="text-box">
                안녕
              </div>
              </section>
              </StyledDiray>
          // </Row>
        ))}
      </>
    )
}

export default DiaryPost
