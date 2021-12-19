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
//form data multipart ->  upload.none()
router.post('/',isLoggedIn, upload.none(), async(req, res, next) => { //POST/user
    try{
      console.log('###########',req.body.content,'########')
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
      });
      if(req.body.image){
        const image = await Image.create({ src: req.body.image});
        await post.addImages(image)
      }

      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [{
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User, // 댓글 작성자
            attributes: ['id', 'nickname'],
          }],
        }, {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }]
      })
      res.status(201).json(fullPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
});

router.post('/:postId/comment',isLoggedIn, async(req, res, next) => {
  try {
    console.log('#######req', req.body, '##############')
    const post = await Post.findOne({
      where: {id: req.params.postId},
    });
    if(!post){
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    return res.status(200).send(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;