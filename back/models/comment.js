module.exports = (sequelize, DataTypes) =>  {
    const Comment = sequelize.define( 'Comment', {// MySQL에는 Comments 테이블 저장
            //id가 기본적으로 들어있다.
            content:{
                type: DataTypes.TEXT,
                allowNull: false
            },
        },{
            charset: 'utf8mb4', //
            collate: 'utf8mb4_general_ci' //mysql 한글 emoticon 저장 저장
        });
     Comment.associate = (db) => {
         
       //belongsTo 쓴 테이블에 컬럼이(ex:userID, PostId) 생긴다.
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
     };
    
        return Comment;
    }