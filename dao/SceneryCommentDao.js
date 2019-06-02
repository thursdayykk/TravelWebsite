var dbutil = require('./DBUtil');

function queryCommentBySceneryId(sId,page,pageSize,success){
    var querySql = "select * from scenery_comment where scenery_id=? order by ctime desc limit ?,?;";
    var params = [sId,page * pageSize,pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function queryCommentBySceneryIdCount(sId,success){
    var querySql = "select count(1) as count from scenery_comment where scenery_id=?;";
    var params = [sId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function addSceneryComment(sId,uId,username,userpic,content,success){
    var querySql = "insert into scenery_comment (`scenery_id`,`user_id`,`username`,`userpic`,`content`) values (?,?,?,?,?);";
    var params = [sId,uId,username,userpic,content];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
module.exports.queryCommentBySceneryId = queryCommentBySceneryId;
module.exports.queryCommentBySceneryIdCount = queryCommentBySceneryIdCount;
module.exports.addSceneryComment = addSceneryComment;