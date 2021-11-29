import React from 'react'
import styled from 'styled-components'
import CommentForm from './CommentForm'
const CommentBox = styled.div`
overflow-y:scroll;
width: 100%;
height: 300px;
background: #fff;
border-bottom: 1px solid lightgray;

h6{
    margin: 10px 10px;
}
h6 span{
    margin-left: 10px;
}
button{
  background: #FFF;
  width:100%;
}
`
function Comment() {
    return (
        <>
        <CommentBox>
        {Array.from({ length: 20 }).map((_, idx) => (
            <h6>{idx}nickname<span>{idx} 댓글입니다</span></h6>
        ))}
        </CommentBox>
           
            <CommentForm />
       </>
    )
}

export default Comment
