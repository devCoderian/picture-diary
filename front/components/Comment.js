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
function Comment({post}) {
    console.log(post);
    return (
        <>
        <CommentBox>
        {post.Comments.map((item) => (
            <h6>{item.User.nickname}<span>{item.content}</span></h6>
        ))}
        </CommentBox>
           
            <CommentForm post = {post}/>
       </>
    )
}

export default Comment
