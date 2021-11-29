//로그인 전략
const passport = require('passport');
// const { Strategy } = require('passport-local');
// 구조 분해 할당식 변수명 바꾸는 방법
const { Strategy : LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt')
module.exports = () =>{
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField: 'password'
    }, async(email, password, done) =>{
        //awit은 try로 감싸주기 비동기는 항상에러를 대비해야한다.
        try{
       const user =  await User.findOne({
            where:{email}
        });

        //passport에서 응답을 보내주지는 않는다.
        if(!user){
            done(null, false, { reason: '존재하지 않는 이메일입니다'})
        }
        const result = bcrypt.compare(password, user.password);
        if(result){
            return done(null, user); 
        }
        return done(null, false, { reason: '비밀번호가 틀렸습니다'});

        
    }catch(error){
        console.error(error);
        return done(error);
    }
    }))
}
//passport.js -> 보내기