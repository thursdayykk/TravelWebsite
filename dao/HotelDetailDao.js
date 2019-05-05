var dbutil = require('./DBUtil');

function insertRoomMsg(values,success){
    var querySql = "insert into hotel_detail (`hotel_id`,`title`,`pic`,`money`,`num`) values ?;";

    var connection = dbutil.createConnection();
    connection.connect();
    // console.log(values)
    connection.query(querySql,[values],(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();8
}

function updateRoomMsg(values,success){
    var querySql = "update hotel_detail set title = ?,pic = ?,money = ?,num = ? where id = ?;";

    var connection = dbutil.createConnection();
    connection.connect();
    // console.log(values)
    values.forEach(item=>{
        // console.log(item)
        connection.query(querySql,item,(err,res) =>{
            if(err == null){
                success(res)
            }else{
                console.log(err)
            }
        });
    })

    connection.end();
}

function deleteRoomMsg(values,success){
    console.log([values])
    var querySql = "delete from hotel_detail where id in ?;";

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,[values],(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function queryRoomDetailByHotelId(id,success){
    var querySql = "select * from hotel_detail where hotel_id = ?;";
    var params = [id];

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
function updateRoomNum(id,num,success){
    var querySql = "update hotel_detail set num = num + ? where id = ?;";
    var params = [num,id];
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

function queryRoomById(id,success){
    var querySql = "select title,pic,hotel_id from hotel_detail where id = ?;";
    var params = [id];
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
module.exports.insertRoomMsg= insertRoomMsg;
module.exports.deleteRoomMsg= deleteRoomMsg;
module.exports.updateRoomMsg= updateRoomMsg;
module.exports.queryRoomDetailByHotelId= queryRoomDetailByHotelId;
module.exports.updateRoomNum= updateRoomNum;
module.exports.queryRoomById= queryRoomById;