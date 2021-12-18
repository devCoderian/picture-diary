const express = require('express');
const db = require('./models');
const app = express();
//라우터 가져오기
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportConfig = require('./passport');
const passport = require('passport');
const dotenv = require('dotenv')
const morgan = require('morgan');
const path = require('path'); //image path
dotenv.config();
passportConfig();
db.sequelize.sync().then(()=>{
    console.log('db 연결 성공');
}
).catch(console.error);

//프론트에서 어떤 요청이 들어왔는지 확인해준다.
app.use(morgan('dev'));
app.use(express.json());  //프론트에서 json형식으로 보냈을 때 json형식의 데이터를 req.body안에 넣어준다.
app.use(express.urlencoded({ extended : true })) //form submit 했을 때 url.encoded 방식으로 데이터가 넘어온다. 해석해줌
//멀티파트 데이터로 받아 처리 -> multer 미들웨어로 처리 app에다 장착할 수도 있지만
//app은 공통적용이기 때문데 보통 라우터에다가 개별 적용해 사용한다.

//image처리를 위해 경로 합치기 '/'는'localhost:3060/'
app.use('/', express.static(path.join(__dirname, 'uploads')));

//브라우저에서 벡엔드로 직접 요청 날릴떄 cors로 다 허용해버리면 위험하니까(보안)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
//로그인 관련 미들웨어 넣기
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveInitialized: false,
	resave: false,
	secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize()); 
app.use(passport.session());


app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter); //복수 게시글

app.listen(3060, () => {
    console.log('서버 실행 중')
})

