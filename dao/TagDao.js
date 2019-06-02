var dbutil = require('./DBUtil');
function addTag(name,success){
    var insertSql = "insert into tag (`name`) values (?)";
    var params = [name];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function queryTagByName(name,success){
    var insertSql = "select * from tag where name = ?";
    var params = [name];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function queryTag(success){
    var insertSql = "select * from tag limit 10";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}


module.exports.addTag = addTag;
module.exports.queryTagByName = queryTagByName
module.exports.queryTag = queryTag