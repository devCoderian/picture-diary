import React from 'react'
import { Form , Button, Image, Row, Col, Badge} from 'react-bootstrap'
import styled from 'styled-components'
const ProfileBox = styled.div`
background: #fff;
border: 1px solid lightgray;
border-radius: 10px;
padding: 5px 10px;
.nickName{
    margin:30px 10px;
}
.content{
    margin:5px 10px 30px;
}
`
function UserProfile({me}) {
    
    return (
        <>
        <ProfileBox>
        <Row>
            <Col>
            <div className="nickName">🙈 {me}</div>
          </Col>
        </Row>
        <div className="content">
        <Row>
          <Col xs={6} md={4}>
          <h6>50 <Badge bg="secondary">Following</Badge></h6>
           
          </Col>
          <Col xs={6} md={4}>
            <h6>50 <Badge bg="secondary">Followers</Badge></h6>
          </Col>
          <Col xs={6} md={4}>
            <h6>50 <Badge bg="secondary">Post</Badge></h6>
          </Col>
        </Row>
        </div>
        </ProfileBox>
        </>
    )
}

export default UserProfile
