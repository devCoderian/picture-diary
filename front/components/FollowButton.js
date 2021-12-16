import React from 'react'
import { Form , Button, Image, Row, Col, Badge} from 'react-bootstrap'
import styled from 'styled-components'
import { BsThreeDotsVertical } from "react-icons/bs";

const StyledFollowButton = styled.div`
// background: #fff;
// border: 1px solid lightgray;
// border-radius: 10px;
.follow{
    margin:15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
h4{
  margin:auto 0;
}
button{
  border: none;
  background-color: rgba(240,240,240,0.7);
  font-size: 22px;
}
`
function FollowButton() {
    
  const onClick = () => {
    alert('수정, 삭제')
  }
    return (
        <>
          <StyledFollowButton>
            <div className="follow">
            <h4>nickname <Badge bg="secondary" > 팔로우</Badge></h4> <button onClick = {onClick}><BsThreeDotsVertical /></button>
          </div>
          </StyledFollowButton>
           
        {/* </ProfileBox> */}
        </>
    )
}

export default FollowButton
