var dbutil = require('./DBUtil');

function addStore(name,pic,address,money,opentime,phone,areaId,typeId,uId,success){
    var querySql = "insert into store (`name`,`pic`,`address`,`money`,`opentime`,`phone`,`area_id`,`type_id`,`user_id`) values (?,?,?,?,?,?,?,?,?);";
    var params = [name,pic,address,money,opentime,phone,areaId,typeId,uId];

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

function updateStore(id,name,pic,address,money,opentime,phone,areaId,typeId,success){
    var querySql = "update store set name=?,pic=?,address=?,money=?,opentime=?,phone=?,area_id=?,type_id=? where id=?;";
    var params = [name,pic,address,money,opentime,phone,areaId,typeId,id];

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

function getStoreByUserId(uId,success){
    var querySql = "select * from store where user_id=? order by ctime desc;";
    if(uId == 1){
        querySql = "select * from store "
    }

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

function queryStoreCount(aId,tId,success){
    var querySql = "";
    var params =[];
    if(aId == 0 && tId > 0){
        querySql = "select count(1) as count from store where type_id=?";
        params = [tId];
    }else if(aId > 0 && tId == 0){
        querySql = "select count(1) as count from store where area_id =?;";
        params = [aId];
    }else if(aId == 0 && tId == 0){
        querySql = "select count(1) as count from store";
        params = [];
    }else if( aId > 0 && tId > 0){
        querySql = "select count(1) as count from store where area_id =? and type_id=?";
        params = [aId,tId];
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
function queryStore(aId,tId,page,pageSize,success){
    var querySql = "";
    var params =[];
    if(aId == 0 && tId > 0){
        querySql = "select id,name,pic,address,money from store where type_id=? order by id desc limit ?,?";
        params = [tId,page*pageSize,pageSize];
    }else if(aId > 0 && tId == 0){
        querySql = "select id,name,pic,address,money from store where area_id =? order by id desc limit ?,?;";
        params = [aId,page*pageSize,pageSize];
    }else if(aId == 0 && tId == 0){
        querySql = "select id,name,pic,address,money from store order by id desc limit ?,?";
        params = [page*pageSize,pageSize];
    }else if( aId > 0 && tId > 0){
        querySql = "select id,name,pic,address,money from store where area_id =? and type_id=? order by id desc limit ?,?";
        params = [aId,tId,page*pageSize,pageSize];
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

function queryStoreById(id,success){
    var querySql = "select * from store where id =?;";
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
function searchStore(content,success){
    var querySql = "select id,pic,name from store where name LIKE ?;";
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
function queryHotStore(success){
    var querySql = "select id,pic from store order by ctime limit 3;";
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

function deleteStore(id,success){
    var querySql = "delete from store where id = ?";
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
module.exports.addStore = addStore;
module.exports.updateStore = updateStore;
module.exports.getStoreByUserId = getStoreByUserId;
module.exports.queryStoreCount = queryStoreCount;
module.exports.queryStore = queryStore;
module.exports.queryStoreById = queryStoreById;
module.exports.searchStore = searchStore;
module.exports.queryHotStore = queryHotStore;
module.exports.deleteStore = deleteStore;