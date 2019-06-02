var dbutil = require('./DBUtil');

function addFood(storeId,name,pic,money,success){
    var querySql = "insert into store_food (`store_id`,`name`,`pic`,`money`) values (?,?,?,?);";
    var params = [storeId,name,pic,money];

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

function updateFood(id,name,pic,money,success){
    var querySql = "update store_food set name=?,pic=?,money=? where id=?;";
    var params = [name,pic,money,id];

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


function deleteFood(id,success){
    var querySql = "delete from store_food where id=?;";
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

function getFood(storeId,success){
    var querySql = "select * from store_food where store_id = ?;";
    var params = [storeId];

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
module.exports.addFood = addFood;
module.exports.updateFood = updateFood;
module.exports.deleteFood = deleteFood;
module.exports.getFood = getFood;