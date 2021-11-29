import React from 'react'
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

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

function CommentForm() {
    return (
        <>
        <StyledCommentForm>
       <Form>
       <h6>Comment</h6>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2}   placeholder="댓글을 남겨주세요"/>
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
