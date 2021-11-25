import Link from 'next/link';
import { Container, Row, Col, InputGroup, FormControl, Button, Stack } from 'react-bootstrap';
import {Brush} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import CalenderCheck from './CalenderCheck';
import DiaryPost from './DiaryPost';
import styled from "styled-components";
import DiaryForm from './DiaryForm';


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
        margin-top: 7px;
        width: 10%;
    }
    #inputSearch{
        width: 40%;
    }
    .signinBtn{
        margin-left: auto;
    }
    .logo a:hover, a:active {text-decoration: none; color:black;}
    a {color: gray; text-decoration: none; outline: none}

    a:hover, a:active {text-decoration: none; color:#fff ;}
`

// const Menu = styled.div`
//     border-bottom : 1px solid lightgray;
//     margin-bottom: 25px;
//     a {color: gray; text-decoration: none; outline: none}
//     a:hover, a:active {text-decoration: none; color:black;}
//     .col-sm{
//         margin-left: 200px;
//         margin-bottom: 18px;
//     }
//     .col-sm a{
//         text-decoration: none;
//         color: black;
//     }
// `

const Contents = styled.div`
    margin-bottom: 100px;

`
 // margin: 0 auto;
 const Layout = ({ children }) =>{
    return (
        <>
        <Container>
           <Stack gap={4}>
               <div>
                <Row>
                <Header>
                    <div className="logo"><Brush/> <Link href ="/">그림일기</Link></div>
                    <InputGroup className="mb-3" id="inputSearch">
                        <FormControl
                        placeholder="search"
                        aria-label="search-hashtag"
                        />
                    </InputGroup>
                    <div className="signinBtn">
                    <Button variant="outline-secondary" type="submit">
                    <Link href ="/signup">sign up</Link>
                    </Button>
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
                <Contents>
                <Row>
                    <Col xl ={8} lg ={8} md ={12}>
                    {children}
                    </Col>
             
                    <Col xl ={4} lg ={4} md ={0} >
                    <Row >
                    <LoginForm />
                    <CalenderCheck/>
                    </Row>
                    </Col>
                </Row>
            </Contents>
            </Container>
        </>
    )
}


export default Layout;