var dbutil = require('./DBUtil');

function addShedule(bId,destination,content,day,traffic,store,success){
    var insertSql = "insert into shecdule (`blog_id`,`destination`,`content`,`day`,`traffic`,`store`) values (?,?,?,?,?,?)";
    var params = [bId,destination,content,day,traffic,store];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function updateShedule(id,destination,content,day,traffic,store,success){
    var insertSql = "update shecdule set destination=?,content=?,day=?,traffic=?,store=? where id =?";
    var params = [destination,content,day,traffic,store,id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function getSheduleByBlogId(bId,success){
    var insertSql = "select * from shecdule where blog_id =? order by day asc";
    var params = [bId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
module.exports.addShedule = addShedule;
module.exports.updateShedule = updateShedule;
module.exports.getSheduleByBlogId = getSheduleByBlogId;