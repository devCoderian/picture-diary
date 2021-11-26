import React from 'react'
import { Form, Row, Col, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';
import styled from 'styled-components';

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
    return (
        <>
        <StyledDirayForm>
       <Form>
       <Form.Label>😊Today😊</Form.Label>
       <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2}   placeholder="무슨일이 있었나요?"/>
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
