import React, { useState, useCallback, useEffect } from 'react'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import styled from 'styled-components';
import ImgZoom from './ImgZoom';
const StyledHeartImage = styled.button`
    font-size:35px;
    position: absolute; 
    bottom: 20px;
    right: 20px;
    z-index:5;
    color: red;
    background: none;
    border: none;
`
function DiaryPostImage() {
    const image = '/image/ediya.png';
    const [imgZoom, setImgZoom] = useState(false);
    const [like, setLike] = useState(false);
    const onLike = () => {
        setLike(!like);
    }
    const unLike = () => {
        setLike(false);
    }
    const onZoom = useCallback(() => {
        setImgZoom(true);
      },[]);
    const onClose = useCallback(() => {
        setImgZoom(false);
        },[])
    useEffect(() => {

    }, [like])
    return (
        // <StyledPostImage>
        <>
        <img role = "presentation" src ='/image/ediya.png' alt= "그림" onClick = {onZoom}/>
        <StyledHeartImage onClick = {onLike}>
            {like? <BsSuitHeartFill /> :  <BsSuitHeart/>}
        </StyledHeartImage>
        {imgZoom && <ImgZoom image = {image} onClose= {onClose} />}
        </>
        // </StyledPostImage>
    )
}

export default DiaryPostImage
