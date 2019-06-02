var dbutil = require('./DBUtil');

//增
function addUser(username,password,power,success){
    var querySql = "insert into user (`username`,`password`,`power`) values (?,?,?);";
    var params = [username,password,power];

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
//删

//改
function updateUser(username,pic,id,success){
    var querySql = "update user set username = ?,pic = ? where id = ?;";
    var params = [username,pic,id];
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
//查
/**
 * 登录
 * */
function queryUserByUserName(username,success){
    var querySql = "select * from user where username = ?;";
    var params = [username];

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
function queryUserName(username,success){
    var querySql = "select username from user where username = ?;";
    var params = [username];

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

function queryUserByUserId(uId,success){
    var querySql = "select * from user where id = ?;";
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

function queryUser(page,pageSize,success){
    var querySql = "select * from user order by id asc limit ?,?;";
    var params = [page * pageSize,pageSize];

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
function queryUserCount(success){
    var querySql = "select count(1) as count from user";
    var params = [];

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



module.exports.queryUserByUserName = queryUserByUserName;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.queryUserName = queryUserName;
module.exports.queryUserByUserId = queryUserByUserId;
module.exports.queryUser = queryUser; //无条件分页获取
module.exports.queryUserCount = queryUserCount;

