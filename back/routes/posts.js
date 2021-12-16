const express = require('express');
// const { User } = require('../models/user');
// const {Image} = require('../models/image');
const router = express.Router();
const { Post,Image,User, Comment } = require('../models');
router.get('/', async (req, res, next) => { // GET /posts
    try {
      const where = {};
      if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
      } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
     // const posts = await Post.findAll({
        //     where: { UserId: 1}
        // });
        // const posts = await Post.findAll({
        //      limit: 10, 10개만 가져오기
        //      offset: 0, => 1번게시글에서 10번 게시글까지
        //      offset: 10, => 11~20
        //      order :[['createdAt', 'DESC']] -> 2차원 배열
        //      20, 19, 18, 17, 16, 15, ...
        //      중간에 21번이 생기면 11을 두번 불러오게 된다. 
        //      게시글 추가 삭제시 문제가 생겨
        //      limit 과 lastId  방식을 주로 쓴다.
        //
        // where: {id: lastId}, //변경 안되고 고정
        // limit: 10,
        // order: [['createdAt', 'DESC']]
        // });
      const posts = await Post.findAll({
        where,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          [Comment, 'createdAt', 'DESC'],
        ],
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }],
        }, {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }, {
          model: Post,
          as: 'Retweet',
          include: [{
            model: User,
            attributes: ['id', 'nickname'],
          }, {
            model: Image,
          }]
        }],
      });
      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  
  module.exports = router;