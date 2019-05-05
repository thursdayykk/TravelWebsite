var hotelDao = require("../dao/HotelDao");
var userDao = require("../dao/UserDao");
var hotelDetailDao = require("../dao/HotelDetailDao");
var userRoomDao = require("../dao/UserRoomDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function bookingRoom(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    // console.log(params)
    userRoomDao.addBookingDetail(parseInt(params.uId),parseInt(params.rId),parseInt(params.dayNum),params.inTime,res =>{
        hotelDetailDao.updateRoomNum(parseInt(params.rId),-1,res =>{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",res));
            resp.end();
        })
    })


}
path.set("/bookingRoom",bookingRoom);


function queryBookByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    userRoomDao.queryBookByUserId(parseInt(params.uId),res =>{
        for(let i = 0;i<res.length;i++){
            hotelDetailDao.queryRoomById(parseInt(res[i].hotel_detail_id),room=>{
                // console.log(room)
                res[i].hotel_id = room[0].hotel_id;
                res[i].title = room[0].title;
                res[i].pic = room[0].pic.toString();
            })

        }
       setTimeout(()=>{
           resp.writeHead(200);
           resp.write(respUtil.writeResult("success","查询成功",res));
           resp.end();
       },500)

    })


}
path.set("/queryBookByUserId",queryBookByUserId);

function unbook(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    userRoomDao.updateStatus(parseInt(params.urId),-1,res =>{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",res));
            resp.end();
    })


}
path.set("/unbook",unbook);

function getBookByHotelId(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    console.log(params);
    hotelDetailDao.queryRoomDetailByHotelId(params.hotelId,resHD =>{
        let hdId = [];
            resHD.forEach(el=>{
                hdId.push(el.id)
            })
        userRoomDao.getBookByHotelDetailId(hdId,res =>{
            for(let i =0;i<res.length;i++){
                for(let j = 0;j<resHD.length;j++){
                    if(res[i].hotel_detail_id == resHD[j].id){
                        res[i].title = resHD[j].title
                    }
                }

                userDao.queryUserByUserId(res[i].user_id,result=>{
                    res[i].username = result[0].username;
                    res[i].pic = result[0].pic
                    if(res[i].pic){
                        res[i].pic = res[i].pic.toString();
                    }

                })
            }
            setTimeout(()=>{
                resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功",res));
                resp.end();
            },500)

        })
    })



}
path.set("/getBookByHotelId",getBookByHotelId);


function changeBookStatus(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    userRoomDao.updateStatus(parseInt(params.urId),parseInt(params.status),res =>{

        if(parseInt(params.status) == 2){
            hotelDao.updateLivedNumById(params.hotelId,res=>{
                resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功",res));
                resp.end();
            })

        }else{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",res));
            resp.end();
        }

    })


}
path.set("/changeBookStatus",changeBookStatus);

function deleteBookByRoomId(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    userRoomDao.deleteBookByRoomId(parseInt(params.rId),res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",res));
        resp.end();
    })


}
path.set("/deleteBookByRoomId",deleteBookByRoomId );


module.exports.path = path;