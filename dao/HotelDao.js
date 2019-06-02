var dbutil = require('./DBUtil');




function getHotelByUserId(uId,success){
    var querySql = "select * from hotel where user_id = ?;";
    var params = [uId];
    if(uId == 1){
        querySql = "select * from hotel;"
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

function insertHotel(name,uId,phone,address,money,areaId,pic,introduction,device,typeId,success){
    var querySql = "insert into hotel (`name`,`user_id`,`phone`,`address`,`money`,`area_id`,`pic`,`introduction`,`device`,`type_id`) values (?,?,?,?,?,?,?,?,?,?);";
    var params = [name,uId,phone,address,money,areaId,pic,introduction,device,typeId];

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

function updatetHotel(id,name,uId,phone,address,money,areaId,pic,introduction,device,typeId,success){
    var querySql = "update hotel set name=?,user_id=?,phone=?,address=?,money=?,area_id=?,pic=?,introduction=?,device=?,type_id=? where id=?";
    var params = [name,uId,phone,address,money,areaId,pic,introduction,device,typeId,id];

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
function getHotelCount(success){
    var querySql = "select count(1) as count from hotel ;";
    var params = []

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
function queryHotel(type,areaId,page,pageSize,success){
    var str = "select count(1) as count from hotel;";
    var data = []
    if(areaId > 0){
        str = "select count(1) as count from hotel where area_id=? ;"
        data = [areaId]
    }else if(type > 0){
        str = "select count(1) as count from hotel where type_id=? ;"
        data =[type]
    }
    if(areaId > 0 && type>0){
        str = "select count(1) as count from hotel where type_id=? and area_id=? ;";
        data = [type,areaId]
    }
    var querySql =  str;
    var params = data;
    console.log(querySql)
    var connection = dbutil.createConnection();
    var result = [];
    queryHotelByPage(type,areaId,page,pageSize,data =>{
        result = {
            hotelList:data,
        }
        result.hotelList.forEach(el=>{
            el.pic = el.pic.toString()
        })
    })

    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){

            setTimeout(()=>{
                  result.count = res[0].count;
                  console.log(result);
                  success(result)
            },500)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function queryHotelByPage(type,areaId,page,pageSize,success){
    var str = "select * from hotel order by id desc limit ?,?;";
    var data = [page * pageSize,pageSize]
    if(areaId > 0){
        str = "select * from hotel where area_id=? order by id desc limit ?,?;"
        data = [areaId,page * pageSize,pageSize]
    }else if(type > 0){
        str = "select * from hotel where type_id=? order by id desc limit ?,?;"
        data =[type,page * pageSize,pageSize]
    }
    if(areaId > 0 && type>0){
        str = "select * from hotel where type_id=? and area_id=? order by id desc limit ?,?;";
        data = [type,areaId,page * pageSize,pageSize]
    }
    var querySql =  str;
    var params = data
    console.log(querySql)
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

function queryHotelById(hoteId,success){
    var querySql = "select * from hotel where id = ?;";
    var params = [hoteId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            if(res[0].pic){
                res[0].pic = res[0].pic.toString();
            }
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function updateLivedNumById(hId,success){
    var querySql = "update hotel set livedNum = livedNum + 1 where id = ? ;";
    var params = [hId]

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
function searchHotel(content,success){
    var querySql = "select id,pic,name from hotel where name LIKE ?;";
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
function queryHotHotel(success){
    var querySql = "select id,pic,name from hotel order by livedNum limit 3;";
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

function deleteHotel(id,success){
    var querySql = "delete from hotel where id = ?";
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
module.exports.getHotelByUserId = getHotelByUserId;
module.exports.insertHotel = insertHotel;
module.exports.updatetHotel = updatetHotel;
module.exports.getHotelCount = getHotelCount;
module.exports.queryHotel = queryHotel;
module.exports.queryHotelById = queryHotelById;
module.exports.updateLivedNumById= updateLivedNumById;
module.exports.searchHotel= searchHotel;
module.exports.queryHotHotel= queryHotHotel;
module.exports.deleteHotel= deleteHotel;