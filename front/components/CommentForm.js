import React, { useCallback, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const StyledCommentForm = styled.div`

padding: 5px 10px;

.submitBtn{
    display: flex;
    justify-content: flex-end;

}
button{
    align-self: flex-end
    background: #F1F0F0;
}
h6{
    font-size: 12px;
}

`

function CommentForm({post}) {
    const [comment, onChangeComment, setComment] = useInput('');
    const id = useSelector((state)=> state.user.me?.id);
    useEffect(() => { 
        setComment('');
    }, [])

    const dispatch = useDispatch();
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(comment, id, post.id)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: comment, userId: id, postId: post.id },
        })
    },[comment,id]);
    
    return (
        <>
        <StyledCommentForm>
        <Form onSubmit = {onSubmit}>
            <h6>Comment</h6>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2}  value = {comment} onChange = {onChangeComment} placeholder="댓글을 남겨주세요"/>
            </Form.Group>
        
            <div className ="submitBtn">
            <Button variant="outline-secondary" type="submit">
                send
            </Button>
            </div>
        </Form>
        </StyledCommentForm>
      </>
    )
}

export default CommentForm
