import React from 'react'
import { Form , Button, Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'

const LoginBtn = styled.button`
border: 1px solid lightgray;
border-radius: 5px;
float:right;
padding: 5px 10px;
`

const LoginBox = styled.div`
@media screen and (max-width: 960px) {
  display:none;
}
border: 1px solid lightgray;
border-radius: 5px;
padding: 5px 10px;

button{
  width:100%;
}
`
  // display: flex;
  // justify-content: flex-end;
function LoginForm() {
    return (
        <>
        <LoginBox>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
    
        {/* <Button variant="primary" type="submit" > */}
        <div className ="submitBtn">
        <Button variant="outline-secondary" type="submit">
            Submit
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
