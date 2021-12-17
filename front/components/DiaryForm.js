import React, { useCallback, useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ADD_POST_REQUEST, UPLOAD_IMAGE_REQUEST } from '../reducers/post';
import { useDispatch } from 'react-redux';

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
#formFile button{
 
    width: 100%;
}
// #file{
//     width: 80%;
// }
`
function DiaryForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('check', title);
        if (!title || !title.trim()) {
            return alert('게시글을 작성하세요.');
          }
          const formData = new FormData();
          formData.append('content', title);
          return dispatch({
            type: ADD_POST_REQUEST,
            data: title,
          });
    },[title]);

    const imageInput = useRef()
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current]);

    const onChangeImage = useCallback((e) => {
        console.log('image', e.target.files);
        //multer처리를 위해 multipart형식으로 보내야 한다
        const imageFormData = new FormData();
        imageFormData.append('image', e.target.files[0]);
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: imageFormData
        })
    }, []);
    return (
        <>
        <StyledDirayForm>
        <Form  encType="multipart/form-data" onSubmit={onSubmit}>
            <Form.Label>Today😊</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                    <Form.Control as="textarea" rows={1} value = {title} onChange = {(e) => setTitle(e.target.value)} placeholder="일기의 제목을 적어주세요" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3" id="formFile">
                    <Form.Control type="file" name ="image" id="file" hidden ref={imageInput} onChange= {onChangeImage}/>
                    <div className ="submitBtn">
                        <Button variant="outline-secondary"  onClick = {onClickImageUpload}>
                            일기 올리기
                        </Button>
                    </div>
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
