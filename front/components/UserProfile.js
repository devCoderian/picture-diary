import React, {useCallback}from 'react'
import {  Row, Col, Badge, Button} from 'react-bootstrap'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
 
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
button{
  background: #FFF;
  display: block;
  width:100%;
  margin-bottom: 10px;
}
`
function UserProfile() {
  const dispatch = useDispatch();
  const { me, logoutLoading} = useSelector(state => state.user)
  const onLogOut = useCallback(
    () => {
        // setIsLoggedIn(false);
        // dispatch(logoutAction); 사가 전
        dispatch(logoutRequestAction());
    },[]);
    return (
        <>
        <ProfileBox>
        <Row>
            <Col>
            <div className="nickName">🙈 {me.nickname}</div>
          </Col>
        </Row>
        <div className="content">
        <Row>
          <Col xs={6} md={4}>
          <h6>{me.Followings.length} <Badge bg="secondary"> Following</Badge></h6>
           
          </Col>
          <Col xs={6} md={4}>
            <h6>{me.Followers.length} <Badge bg="secondary"> Followers</Badge></h6>
          </Col>
          <Col xs={6} md={4}>
            <h6>{me.Posts.length} <Badge bg="secondary"> Post</Badge></h6>
          </Col>
        </Row>
        </div>
        <Row>
        <div className ="submitBtn">
        <Button variant="outline-secondary" type="submit" onClick = {onLogOut}>
            로그아웃
        </Button>
        </div>
        </Row>
        </ProfileBox>
        </>
    )
}

export default UserProfile
