import React from 'react'
import { Form , Button, Image, Row, Col, Badge} from 'react-bootstrap'
import styled from 'styled-components'
const styledFollowButton = styled.div`
background: #fff;
border: 1px solid lightgray;
border-radius: 10px;
.follow{
    margin:15px 20px;
}
`
function FollowButton() {
    
    return (
        <>
          <styledFollowButton>
            <div className="follow">
          <h4>nickname <Badge bg="secondary" > 팔로우</Badge></h4>
          </div>
          </styledFollowButton>
           
        {/* </ProfileBox> */}
        </>
    )
}

export default FollowButton
