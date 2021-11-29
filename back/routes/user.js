const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post} = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middleware');
const passport = require('passport');

//회원가입
router.post('/', isNotLoggedIn, async(req, res, next) =>{  //post /user
    //req -> saga -> signupAPI 에서 들어온것
    // 비동기 -> bcrypt -> 비동기처리 -> 숫자가 높으면 암호화 보안이 높아짐 단 속도가 낮아짐
    try{
        //email 중복 체크
        const exUser = await User.findOne({
            where:{
                email:req.body.email,
            }
        }); // 있으면 저장, 없으면 null
        if(exUser){
            //return 을 안 붙이면 밑에 함수가 실행되면서 응답이 두번 되어버려서 오류가 난다.
            return res.status(403).send('이미 사용중인 아이디입니다. ');
            //header -> body(실제 데이터)에 대한 정보 -> 용량이 어떻고 형식이 어떤지
            //return 에서 router 종료
        }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    //create 테이블안에 데이터를 넣는것
    await User.create({
        email:req.body.email,
        nickname: req.body.nickname,
        // password: req.body.password 
        //비밀번호를 그대로 저장하면 보안에 위험이 된다. -> 라이브러리 사용 npm i bcrypt
        password: hashedPassword,

    })
    res.status(200).send('회원가입 완료');
    }catch (error){
        console.error(error);
        next(error); //error가 발생하면 익스프레스가 한방에 next로 보내기 
        //서버에러라서 status 500
    }
});

//로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr)=>{
            //패스포트 에러
            console.error(loginErr)
            if(loginErr){
                return next(loginErr);
            }
            //find한번 더 하는 이유 다른 정보 빼고 붙여서 보내기 위해
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                  exclude: ['password']
                },
                include: [{
                  model: Post,
                  attributes: ['id']
                }, {
                  model: User,
                  as: 'Followings',
                  attributes: ['id']
                }, {
                  model: User,
                  as: 'Followers',
                  attributes: ['id']
                }]
              })
              console.log(fullUserWithoutPassword)
              return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});
//로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공')
});
module.exports = router;