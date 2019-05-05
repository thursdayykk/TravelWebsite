var hotelDao = require("../dao/HotelDao");
var hotelDetailDao = require("../dao/HotelDetailDao");
var respUtil = require("../util/RespUtil");
var url = require('url');


var path = new Map();


function getHotelByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    hotelDao.getHotelByUserId(params.userId,res =>{
        resp.writeHead(200);
        for(var i = 0;i<res.length;i++){
            res[i].pic = res[i].pic.toString()
        }
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();

    })
}
path.set("/getHotelByUserId",getHotelByUserId);

function insertHotel(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    hotelDao.insertHotel(params.name,params.uId,params.phone,params.address,params.money,params.areaId,params.pic,params.introduction,params.device,params.typeId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();

    })
}
path.set("/insertHotel",insertHotel);

function queryRoomDetailByHotelId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    hotelDetailDao.queryRoomDetailByHotelId(params.hotelId,res =>{
        for(let i =0;i<res.length;i++){
            res[i].pic = res[i].pic.toString()
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();

    })
}
path.set("/queryRoomDetailByHotelId",queryRoomDetailByHotelId);

function updatetHotel(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;

    hotelDao.updatetHotel(params.hotelId,params.name,params.uId,params.phone,params.address,params.money,params.areaId,params.pic,params.introduction,params.device,params.typeId,res =>{
        // resp.writeHead(200);
        // resp.write(respUtil.writeResult("success","酒店修改成功",res));
        // resp.end();

    })

    //添加
    if(params.addRoomList.length>0){
        let values = [];
        for(let i =0;i<params.addRoomList.length;i++){
            values.push([params.hotelId,params.addRoomList[i].title,params.addRoomList[i].pic,params.addRoomList[i].money,params.addRoomList[i].num])
        }
        hotelDetailDao.insertRoomMsg(values,res=>{

        })
    }
    //更新
    if(params.updateRoomList.length>0){
        let values = [];
        for(let i =0;i<params.updateRoomList.length;i++){
            values.push([params.updateRoomList[i].title,params.updateRoomList[i].pic,params.updateRoomList[i].money,params.updateRoomList[i].num,params.updateRoomList[i].id])
        }
        hotelDetailDao.updateRoomMsg(values,res=>{})
    }

    setTimeout(()=>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","房间信息添加成功",null));
        resp.end();
    },500)


}
path.set("/updatetHotel",updatetHotel);

function deleteRoomDetail(req,resp){
    var params = req.body;
    console.log(params)
    hotelDetailDao.deleteRoomMsg([params.deleteId],res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",null));
        resp.end();
    })
}
path.set("/deleteRoomDetail",deleteRoomDetail);


function getHotelCount(req,resp){
    // var params = url.parse(req.url,true).query;
    hotelDao.getHotelCount(res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/getHotelCount",getHotelCount);


function queryHotel(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    console.log(params)
    hotelDao.queryHotel(parseInt(params.type),parseInt(params.areaId),parseInt(params.page),parseInt(params.pageSize),res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryHotel",queryHotel);

function queryHotelById(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    console.log(params)
    hotelDao.queryHotelById(parseInt(params.hotelId),res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryHotelById",queryHotelById);



module.exports.path = path;