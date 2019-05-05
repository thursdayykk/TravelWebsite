var dbutil = require('./DBUtil');

function addHotelComment(uId,username,userpic,content,hotelId,parentId,parentUserName,success){
    var querySql = "insert into hotel_comment (`user_id`,`username`,`userpic`,`content`,`hotel_id`,`parent_id`,`parent_username`) values (?,?,?,?,?,?,?);";
    var params = [uId,username,userpic,content,hotelId,parentId,parentUserName];
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

function getCommentByHotelIdCount(hId,success){
    var querySql = "select count(1) as count from hotel_comment where hotel_id = ?;";
    var params = [hId];
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

function getCommentByHotelId(hId,page,pageSize,success){
    var querySql = "select * from hotel_comment where hotel_id = ? order by ctime desc limit ?,?;";
    var params = [hId,page * pageSize,pageSize];
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

function deleteHotelCommentById(values,success){
    var querySql = "delete from hotel_comment where id in ?;";
    // var params = [hId,page * pageSize,pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,[[values]],(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

module.exports.addHotelComment= addHotelComment;
module.exports.getCommentByHotelId= getCommentByHotelId;
module.exports.getCommentByHotelIdCount= getCommentByHotelIdCount;
module.exports.deleteHotelCommentById= deleteHotelCommentById;