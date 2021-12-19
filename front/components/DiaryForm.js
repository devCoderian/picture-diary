import React, { useCallback, useState, useRef, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ADD_POST_REQUEST, REMOVE_IMAGE_REQUEST, UPLOAD_IMAGE_REQUEST } from '../reducers/post';
import { useDispatch, useSelector } from 'react-redux';
import { backUrl } from '../config/config';
import { BsDashCircle } from "react-icons/bs";
const StyledDirayForm = styled.div`
background: #fff;
margin-bottom: 20px;
border: 1px solid lightgray;
border-radius: 10px;
padding: 5px 10px;
position: relative;
.submitBtn{
    display: flex;
    justify-content: flex-end;
}
button{
    background: #F1F0F0;
}
#formFile{
    // display: flex;
    // justify-content: space-between; 
    width: 100%;
}
#image-upload{
    margin-top: 20px;
    width: 100%;
}
.preview img{
    width: 100%;
    object-fit: cover;
    height: 400px;   
}
.preview button{
    width: 60px;
    height: 60px;
    font-size:35px;
    position: absolute; 
    top: 100px;
    right: 30px;
    tran
    z-index:5;
    color: #000;
    border: none;

}

.preview svg{
    font-size: 30px;
    vertical-align: baseline;
}
`
function DiaryForm() {

    const {imagePath,addPostDone} = useSelector(state => state.post)
    console.log(imagePath,'imagePath', imagePath.length)
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (addPostDone) {
            setTitle('');
        }
      }, [addPostDone]);


    const onSubmit = useCallback((e) => {
        e.preventDefault();
        // e.stopPropagation();
        console.log('check', title);
        if (!title || !title.trim()) {
            return alert('게시글을 작성하세요.');
          }
        
          const formData = new FormData();
          formData.append('image', imagePath);
          formData.append('content', title);
          // FormData의 key 확인
for (let key of formData.keys()) {
  console.log(key);
}
        // FormData의 value 확인
for (let value of formData.values()) {
    console.log(value);
  }
          return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
          });
          
    },[title, imagePath]);

    const imageInput = useRef()
    const onClickImageUpload = useCallback((e) => {
        e.stopPropagation();
        imageInput.current.click();
    },[imageInput.current]);

    const onChangeImage = useCallback((e) => {
        e.stopPropagation();
        console.log('image', e.target.files);
        //multer처리를 위해 multipart형식으로 보내야 한다
        const imageFormData = new FormData();
        imageFormData.append('image', e.target.files[0]);
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: imageFormData
        })
    }, []);

    //고차 함수 
    const onRemoveImage = useCallback((index) => () => {
     
           dispatch({
               type:REMOVE_IMAGE_REQUEST,
               data:index
           })
        },[])

    return (
        <>
        <StyledDirayForm>
        <Form  encType="multipart/form-data" onSubmit={onSubmit}>
            <Form.Label>Today😊</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={1} value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder="일기의 제목을 적어주세요" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" name ="image" id="file" hidden ref={imageInput} onChange= {onChangeImage}/>
                    {
                    !(imagePath.length === 0) &&(
                        <div className = "preview">
                            <div key={imagePath}>
                                <img src={`${backUrl}/${imagePath}`} alt={imagePath} />
                                    {/* map안에 데이터를 넣고 싶으면 고차 함수 */}
                                    <Button variant="outline-secondary" onClick={onRemoveImage(imagePath)}><BsDashCircle /></Button>
                            </div>
                        </div>
                    )
                    }
                   
                        <Button id= "image-upload" variant="outline-secondary"  onClick = {onClickImageUpload}>
                            일기 올리기
                        </Button>
          
            </Form.Group>
        
            
            <div className ="submitBtn">
                <Button variant="outline-secondary" type="submit">
                    기록하기 
                </Button>
            </div>
            </Form>
        </StyledDirayForm>
      </>
    )
}

export default DiaryForm
