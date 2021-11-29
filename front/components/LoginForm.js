import React, { useState, useEffect, useCallback } from 'react'
import { Form ,Button} from 'react-bootstrap'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { loginRequestAction } from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux';

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
function LoginForm() {
  const dispatch = useDispatch(); 
  const { loginLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
 //back단 에러
    useEffect(() => {
        if(logInError)
        alert(logInError)
       
    }, [logInError]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(loginRequestAction({email,password}))
  },[email, password]);
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
          <Form.Control type="password" placeholder="Password" value = {password} onChange ={onChangePassword} />
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
