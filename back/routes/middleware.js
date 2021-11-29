exports.isLoggedIn = (req, res, next) => {
    
    //front에서는me, back에서는 req.user로 검사할 수 있다.
    //여기서는 passport가 제공하는 
    if(req.isAuthenticated()){
        // next(error); error를 넣으면 error처리를 하고 비워두면 다음 미들웨어를 처리하러 간다.
        next();
    }else{
        res.status(401).send('로그인이 필요합니다.');
    }
}

//cf)error처리 미들웨어는 내부적으로 존재한다. 
//custom하고 싶다면?
//app.js 에서 사용 
//app.use((err, req, res, next)=>{
//에러페이지를 따로 띄워주고 싶다면 따로 만들기
//});

//로그인 안 했을 시
exports.isNotLoggedIn = (req, res, next) => {
    
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인한 사용자만 접근 가능합니다.')
    }
}
//routes user에서 가져다 쓰기
