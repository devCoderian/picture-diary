const express = require('express');
const router = express.Router();
const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middleware');
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