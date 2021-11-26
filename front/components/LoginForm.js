import React, { useState } from 'react'
import { Form , Button, Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import useInput from '../hooks/useInput'

const LoginBtn = styled.button`
background: #fff;
border: 1px solid lightgray;
border-radius: 5px;
float:right;
padding: 5px 10px;
`

const LoginBox = styled.div`
@media screen and (max-width: 960px) {
  display:none;
}
background: #fff;
border: 1px solid lightgray;
border-radius: 10px;
padding: 5px 10px;

button{
  background: #FFF;
  width:100%;
}
`
function LoginForm({setIsLogin, setMe}) {

  const [email, onChangeEmail] = useInput('');
  const [password, onChangeePassword] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    setMe(email);
    setIsLogin(true);
  }
    return (
        <>
        <LoginBox>
        <Form onSubmit ={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value = {email} onChange ={onChangeEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value = {password} onChange ={onChangeePassword} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
    
        {/* <Button variant="primary" type="submit" > */}
        <div className ="submitBtn">
        <Button variant="outline-secondary" type="submit">
            로그인
        </Button>
        </div>
        {/* </Button> */}
        
        </Form.Group>
      </Form>
      </LoginBox>
      </>
    )
}

export default LoginForm
