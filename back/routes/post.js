const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middleware');
const path = require('path'); //노드 자체 제공
const fs = require('fs'); 
//업로드 폴더 만들기

try{
  fs.accessSync('uploads');
}catch{
  console.log('upload 폴더 생성')
  fs.mkdirSync('uploads')
}
const upload = multer({
  storage: multer.diskStorage({  //나중에 destination 은 S3로 바꾸기!
    destination(req, file, done){
      done(null, 'uploads');
    }, 
    filename(req, file, done){ 
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext); //덮어쓰기 방지
    }
  }),
  limits : { fileSize: 28 * 1024 * 1024} //파일 업로드도 너무 크면 공격이 될 수 있다.
})
//upload.array('image') 여러개 image input의 name upload.none() -> text
router.post('/images', isLoggedIn, upload.single('image'),async(req, res, next)=> { //POST/images
  console.log('##############################',req.file); //업로드된 정보;
  res.json(req.file.filename);

});
router.post('/',isLoggedIn, async(req, res, next) => { //POST/user
    try{
      console.log(req.body)
    const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
      });

      // const fullPost = await Post.findOne({
      //   where: { id: post.id },
      //   include: [{
      //     model: Image,
      //   }, {
      //     model: Comment,
      //     include: [{
      //       model: User, // 댓글 작성자
      //       attributes: ['id', 'nickname'],
      //     }],
      //   }, {
      //     model: User, // 게시글 작성자
      //     attributes: ['id', 'nickname'],
      //   }, {
      //     model: User, // 좋아요 누른 사람
      //     as: 'Likers',
      //     attributes: ['id'],
      //   }]
      // })
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
});

module.exports = router;