module.exports = (sequelize, DataTypes) =>  {
    const Image = sequelize.define( 'Image', {// MySQL에는 Images 테이블 저장
            //id가 기본적으로 들어있다.
            src:{
                type: DataTypes.STRING(200),
                allowNull: false
            },
        },{
            charset: 'utf8', //
            collate: 'utf8_general_ci' //mysql 한글 emoticon 저장 저장
        });
     
        Image.associate = (db) => {
            db.Image.belongsTo(db.Post);
        };
    
        return Image;
    }