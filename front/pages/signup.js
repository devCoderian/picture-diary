import React from 'react'
import { Form , Button, Container, Row, Col} from 'react-bootstrap'
import styled from 'styled-components'
import Layout from '../components/Layout'



const SignUpBox = styled.div`
border: 1px solid lightgray;
border-radius: 5px;
padding: 35px 70px;
margin-bottom: 15px;
button{
  width:100%;
}
`
  // display: flex;
  // justify-content: flex-end;
function Signup() {
    return (
        <>
          <Layout>
        <SignUpBox>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>nickname</Form.Label>
          <Form.Control type="text" placeholder="Enter nickname" />
          <Form.Text className="text-muted">
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
      </SignUpBox>
      </Layout>
      </>
    )
}

export default Signup
