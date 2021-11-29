module.exports = (sequelize, DataTypes) =>  {
    const User = sequelize.define('User', {//대문자, MySQL에는 users 테이블 저장
            //id:{}, id가 기본적으로 들어있다.
            email:{
                //컬럼에 대한 설명
                type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: false, //필수
                unique: true, //고유한 값
                
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false, //필수
            }
        },{//두번째 객체 유저 모델에 대한 setting
            charset: 'utf8', //mysql 한글 저장
            collate: 'utf8_general_ci' //mysql 한글 저장
        });
        User.associate = (db) => {
            //테이블들의 관계
            db.User.hasMany(db.Post); //사용자가 여러개 쓸수 있음 -> 일대다
            db.User.hasMany(db.Comment);
            //만약 일대일 관계인 테이블이 있다면
            //유저인포랑 유저는 일대일
            //db.User.hasOne(db.UserInfo);
            //belongsToMany 다대다
            //중간 테이블이 생긴다.
            //through -> 중간테이블 이름
            //throug 는 db 테이블 이름 , as는 js에서 사용할 이름
            db.User.belongsToMany(db.Post, {through: 'Like' ,as: 'Liked'}); //좋아요 다대다 관계
            //같은 테이블에서는 key이름을 바꿔줌 생성된 관계테이블에서 구별이 불가능 하기 때문에(userId, userId) forine key 
            db.User.belongsToMany(db.User,  {through: 'Follow', as: 'Followers', forienKey: 'FollowingId'}); 
            db.User.belongsToMany(db.User,  {through: 'Follow', as: 'Followings', forienKey: 'FollowerId'}); 
        };
    
        return User;
    }