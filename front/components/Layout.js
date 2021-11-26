import Link from 'next/link';
import { Container, Row, Col, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';
import {Brush} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import CalenderCheck from './CalenderCheck';
import DiaryPost from './DiaryPost';
import styled from "styled-components";
import DiaryForm from './DiaryForm';
import UserProfile from './UserProfile';
import { useState } from 'react';


const Header = styled.div`
@media screen and (max-width: 960px) {
    .logo{
    display:none;
    }
}
    display:flex;
    margin-top: 45px;
    border-bottom : 1px solid lightgray;
    .logo{
        width: 10%;
    }
    #inputSearch{
        width: 30%;
    }
    .signinBtn{
        margin-left: auto;
    }
    button{
        background: #fff;
    }

    .logo a {color: gray; text-decoration: none; outline: none; font-size: 22px;}
    .logo a:hover, a:active {text-decoration: none; color:black;}
    a {color: gray; text-decoration: none; outline: none}
    a:hover, a:active {text-decoration: none; }
`

const LayoutStyle = styled.div`
   background: #fff;

`
// background: #F1F0F0;

 const Layout = ({ children }) =>{

  const [isLogin, setIsLogin] = useState(false);
  const [me, setMe] = useState('');
    return (
        <LayoutStyle>
        <Container>
           <Stack gap={4}>
               <div>
                <Row>
                <Header>
                    {/* <div className="logo"><Brush/> 🖼️<Link href ="/">그림일기</Link></div> */}
                    <div className="logo"><Link href ="/">🖼️-diary</Link></div>
                    <InputGroup className="mb-3" id="inputSearch">
                        <FormControl
                        placeholder="search"
                        aria-label="search-hashtag"
                        />
                    </InputGroup>
                    <div className="signinBtn">
                   
                    <Link href ="/signup"> 
                    <Button variant="outline-dark" type="submit">
                        가입하기
                    </Button>
                    </Link>
                    
                    </div>
                    </Header>        
                </Row>
                </div>
                <div>  
                {/* <Menu>
                <Row>
                    <Col sm><Link href ="/">Home</Link> </Col>
                    <Col sm><Link href ="/calender">Calender</Link></Col>
                    <Col sm><Link href ="/profile">profile</Link></Col>
                </Row>
                </Menu> */}
                </div>  
                </Stack>
                <Row>
                    <Col xl ={8} lg ={8} md ={12}>
                    {children}
                    </Col>
             
                    <Col xl ={4} lg ={4} md ={0} >
                    <Row >
                        {isLogin ? <UserProfile me={me} />:  <LoginForm setIsLogin={setIsLogin} setMe={setMe}/>}
                    <CalenderCheck/>
                    </Row>
                    </Col>
                </Row>
            </Container>
        </LayoutStyle>
    )
}


export default Layout;