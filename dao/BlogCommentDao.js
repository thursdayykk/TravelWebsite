var dbutil = require('./DBUtil');
function addBlogComment(uId,content,blogId,parentId,success){
    var querySql = "insert into blog_comment (`user_id`,`content`,`blog_id`,`parent_id`) values (?,?,?,?);";
    var params = [uId,content,blogId,parentId];
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

function getCommentByBlogIdCount(bId,success){
    var querySql = "select count(1) as count from blog_comment where blog_id = ?;";
    var params = [bId];
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

function getCommentByBlogId(bId,page,pageSize,success){
    var querySql = "select * from blog_comment where blog_id = ? order by ctime desc limit ?,?;";
    var params = [bId,page * pageSize,pageSize];
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

module.exports.addBlogComment= addBlogComment;
module.exports.getCommentByBlogId= getCommentByBlogId;
module.exports.getCommentByBlogIdCount= getCommentByBlogIdCount;
