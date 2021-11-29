import React, {useEffect, useCallback, useState} from 'react'
import { Form , Button} from 'react-bootstrap'
import styled from 'styled-components'
import Layout from '../components/Layout'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from '../reducers/user'
import Router from 'next/router';
const SignUpBox = styled.div`
border: 1px solid lightgray;
border-radius: 5px;
padding: 35px 70px;
background: #fff;

button{
  background: #F1F0F0;
  width:100%;
}
`
function Signup() {
  const dispatch = useDispatch();
  const {signupLoading, signUpDone, signUpError, me} = useSelector((state) => state.user);

  useEffect(() => {
    if(me&&me.id){
        Router.replace('/');
        //확실히 나가려면 Router.replace('/');
        //기록에서 사라짐
    }
  }, [me&&me.id]);

  useEffect(() => {
    if(signUpDone){
        Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if(signUpError){
        alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNick] = useInput('');
  const [password, onChangeePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
        setPasswordCheck(e.target.value);
        setPasswordErr(e.target.value !== password);
    },[password])

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== passwordCheck){
      return setPasswordErr(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST, 
      data : {email, nickname, password}
    })
  
  }
    return (
        <>
        <Layout>
          <SignUpBox>
          <Form onSubmit = {onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value = {email} onChange ={onChangeEmail}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>nickname</Form.Label>
            <Form.Control type="text" placeholder="Enter nickname" value = {nickname} onChange ={onChangeNick}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value = {password} onChange ={onChangeePassword} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value = {passwordCheck} onChange ={onChangePasswordCheck} />
              {passwordErr && <Form.Text className="text-muted">비밀번호가 일치하지 않습니다.</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3">
          <div className ="submitBtn">
          <Button variant="outline-secondary" type="submit">
              Submit
          </Button>
          </div>
          </Form.Group>
        </Form>
        </SignUpBox>
      </Layout>
      </>
    )
}

export default Signup
