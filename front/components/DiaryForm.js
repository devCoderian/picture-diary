import React, { useCallback, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ADD_POST_REQUEST } from '../reducers/post';
import { useDispatch } from 'react-redux';

const StyledDirayForm = styled.div`
background: #fff;
margin-bottom: 20px;
border: 1px solid lightgray;
border-radius: 10px;
padding: 5px 10px;
position: relative;
.submitBtn{
    display: flex;
    justify-content: flex-end;
}
button{
    background: #F1F0F0;
}

`
function DiaryForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('check', title);
        if (!title || !title.trim()) {
            return alert('게시글을 작성하세요.');
          }
          const formData = new FormData();
          console.log(formData);
          formData.append('content', title);
          return dispatch({
            type: ADD_POST_REQUEST,
            data: title,
          });
    },[title]);

    return (
        <>
        <StyledDirayForm>
        <Form  encType="multipart/form-data" onSubmit={onSubmit}>
            <Form.Label>Today😊</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={1} value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder="일기의 제목을 적어주세요" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file"/>
            </Form.Group>
        
            
            <div className ="submitBtn">
                <Button variant="outline-secondary" type="submit">
                    기록하기 
                </Button>
            </div>
            </Form>
        </StyledDirayForm>
      </>
    )
}

export default DiaryForm
