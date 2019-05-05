var dbutil = require('./DBUtil');


function addBookingDetail(uId,rId,dayNum,intime,success){
    var querySql = "insert into user_booking (`user_id`,`hotel_detail_id`,`dayNum`,`intime`) values (?,?,?,?);";
    var params = [uId,rId,dayNum,intime];

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

function queryBookByUserId(uId,success){
    var querySql = "select * from user_booking where user_id = ? order by ctime desc;";
    var params = [uId];

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

function updateStatus(urId,status,success){
    var querySql = "update user_booking set status = ? where id = ?;";
    var params = [status,urId];

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

function getBookByHotelDetailId(values,success){
    var querySql = "select * from user_booking where hotel_detail_id in ? order by ctime desc;";
    // var params = [hId];
    console.log(values)
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

function deleteBookByRoomId(rId,success){
    var querySql = "delete from user_booking where hotel_detail_id = ?;";
    var params = [rId];
    // console.log(values)
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
module.exports.addBookingDetail = addBookingDetail;
module.exports.queryBookByUserId = queryBookByUserId;
module.exports.updateStatus = updateStatus;
module.exports.getBookByHotelDetailId = getBookByHotelDetailId;
module.exports.deleteBookByRoomId = deleteBookByRoomId;