import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

const StyledZoom = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba( 0, 0, 0, 0.5 );
    display: flex;
    align-items: center;
    .zoom-img{
        margin: 0 auto;
        width: 70%;
        cursor: pointer;
    }
    .zoom-img img{
        object-fit: cover;
        width: 100%;
    }
`



function ImgZoom({ image, onClose }) {
    console.log(image)
    return (
        <StyledZoom>
            <div class = "back" onClick = {onClose}>
                <div class = "zoom-img"> 
                    <img src ={image} alt= "그림"/>
                </div>
            </div>
               
        </StyledZoom>
    )
}
ImgZoom.propTypes = {
    image: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}
export default ImgZoom
