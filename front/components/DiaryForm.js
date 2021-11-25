import React from 'react'
import { Form, Row, Col, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDirayForm = styled.div`
margin-bottom: 20px;
border: 1px solid lightgray;
border-radius: 5px;
padding: 5px 10px;
position: relative;
.submitBtn{
    display: flex;
    justify-content: flex-end;
}
`
function DiaryForm() {
    return (
        <>
        <StyledDirayForm>
       <Form>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2}   placeholder="오늘의 일기를 써주세요."/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" />
        </Form.Group>
        <div className ="submitBtn">
        <Button variant="outline-secondary" type="submit">
            Submit
        </Button>
        </div>
        </Form>
        </StyledDirayForm>
      </>
    )
}

export default DiaryForm
