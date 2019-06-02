var dbutil = require('./DBUtil');

function addScenery(name,pic,content,address,phone,traffic,opentime,areaId,userId,success){
    var querySql = "insert into scenery (`name`,`pic`,`content`,`address`,`phone`,`traffic`,`opentime`,`area_id`,`user_id`) values (?,?,?,?,?,?,?,?,?);";
    var params = [name,pic,content,address,phone,traffic,opentime,areaId,userId];

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

function updateScenery(id,name,pic,content,address,phone,traffic,opentime,areaId,success){
    var querySql = "update scenery set name = ?,pic = ?,content=?,address=?,phone=?,traffic=?,opentime=?,area_id=? where id = ?;";
    var params = [name,pic,content,address,phone,traffic,opentime,areaId,id];
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
function getSceneryByUserId(uId,success){
    var querySql = "select  * from scenery where user_id = ? order by ctime desc";
    var params = [uId];
    if(uId == 1){
        querySql = "select * from scenery order by ctime desc";
        params = [];
    }
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

function queryHotScenery(success){
    var querySql = "select  id,pic,content,name from scenery order by views desc limit 3";
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
function queryRandomScenery(success){
    var querySql = "select id,pic,content,name from scenery order By rand(id) limit 5 ";
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

function queryScenery(page,pageSize,areaId,success){
    var querySql = "select  id,pic,name from scenery order by id desc limit ?,?";
    var params = [page *pageSize,pageSize];
    if(areaId > 0){
        querySql = "select  id,pic,name from scenery where area_id = ? order by id desc limit ?,?";
        params = [areaId,page *pageSize,pageSize];
    }
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
function querySceneryCount(areaId,success){
    var querySql = "select count(1) as count from scenery";
    var params = [];
    if(areaId > 0){
        querySql = "select count(1) as count from scenery where area_id = ?";
        params = [areaId];
    }

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
function querySceneryById(id,success){
    var querySql = "select * from scenery where id =?;";
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


function addViews(sId,success){
    var querySql = "update scenery set views = views+1 where id = ?";
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
function searchScenery(content,success){
    var querySql = "select id,pic,name from scenery where name LIKE ?;";
    var params = ['%'+content+'%'];

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

function deleteScenery(id,success){
    var querySql = "delete from scenery where id = ?";
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
module.exports.addScenery = addScenery;
module.exports.updateScenery = updateScenery;
module.exports.getSceneryByUserId = getSceneryByUserId;
module.exports.queryHotScenery = queryHotScenery;
module.exports.queryRandomScenery = queryRandomScenery;
module.exports.queryScenery = queryScenery;
module.exports.querySceneryCount = querySceneryCount;
module.exports.querySceneryById = querySceneryById;
module.exports.addViews = addViews;
module.exports.searchScenery= searchScenery;
module.exports.deleteScenery= deleteScenery;



