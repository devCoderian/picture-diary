const passport = require('passport');
const local = require('./local'); 
const { User } = require('../models');
//passport 설정파일
module.exports = () => {

    passport.serializeUser((user, done)=>{
        done(null, user.id); //첫번째 인자 서버에러 , 두번쨰 인자 null
    });

    //로그인 성공 후 그 다음요청부터 매번 DB로부터 사용자 정보를 복구한다.
    //라우터 실행전에 매번실행되기 때문에 req.user에 정보가 담겨있다.
    //serializeUser로 아이디만 들고 있다가 라우터 접근전에 저장햇던 아이디를 토대로 사용자 정보만 가져온다. 
    passport.deserializeUser(async(id, done)=>{
        try{
            const user = await User.findOne({ where: {id} });
            done(null, user); //req.user 안에 담는다.
        }catch(err){
            console.error(err);
            done(err); //passport는 done으로 처리
        }
    });

    local();
}
//app.js로 보내기
// 프론트에서 서버로는 cookie만 보냄(clhxy)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 1 발견
// id: 1이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱