import React, { useState, useCallback, useEffect } from 'react'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import styled from 'styled-components';
import { backUrl } from '../config/config';
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
function DiaryPostImage({post}) {
 
    const [imgZoom, setImgZoom] = useState(false);
    const [like, setLike] = useState(false);
    console.log(post)
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
        <img role = "presentation" src ={`${backUrl}/${post.Images[0].src}`} alt= "그림" onClick = {onZoom} style = {{cursor:"pointer"}}/>
        <StyledHeartImage onClick = {onLike}>
            {like? <BsSuitHeartFill /> :  <BsSuitHeart/>}
        </StyledHeartImage>
        {imgZoom && <ImgZoom image = {post.Images[0].src} onClose= {onClose} />}
        </>
        // </StyledPostImage>
    )
}

export default DiaryPostImage
