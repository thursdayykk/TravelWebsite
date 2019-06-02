var dbutil = require('./DBUtil');
function addStoreComment(uId,content,storeId,parentId,success){
    var querySql = "insert into store_comment (`user_id`,`content`,`store_id`,`parent_id`) values (?,?,?,?);";
    var params = [uId,content,storeId,parentId];
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

function getCommentByStoreIdCount(sId,success){
    var querySql = "select count(1) as count from store_comment where store_id = ?;";
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

function getCommentByStoreId(sId,page,pageSize,success){
    var querySql = "select * from store_comment where store_id = ? order by ctime desc limit ?,?;";
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

module.exports.addStoreComment= addStoreComment;
module.exports.getCommentByStoreId= getCommentByStoreId;
module.exports.getCommentByStoreIdCount= getCommentByStoreIdCount;
