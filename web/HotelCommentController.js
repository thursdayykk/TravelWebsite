// var hotelDao = require("../dao/HotelDao");
var hotelCommentDao = require("../dao/HotelCommentDao");
var respUtil = require("../util/RespUtil");
var url = require('url');


var path = new Map();

function addHotelComment(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    // console.log(params)
    hotelCommentDao.addHotelComment(params.uId,params.username,params.pic,params.text,params.hId,params.pId,params.parentusername,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","评论成功",res));
        resp.end();

    })
}
path.set("/addHotelComment",addHotelComment);

function getCommentByHotelId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    hotelCommentDao.getCommentByHotelIdCount(parseInt(params.hotelId),res=>{
        hotelCommentDao.getCommentByHotelId(parseInt(params.hotelId),parseInt(params.page),parseInt(params.pageSize),result =>{
            for(let i = 0;i<result.length;i++){
                // console.log(i)
                 if(result[i].userpic){
                     result[i].userpic = result[i].userpic.toString()
                 }
            }
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功", {
                commentList:result,
                count:res[0].count
            }));
            resp.end();

        })
    })

}
path.set("/getCommentByHotelId",getCommentByHotelId);

function deleteHotelCommentById(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    // console.log(params)
    hotelCommentDao.deleteHotelCommentById(params.deleteId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",res));
        resp.end();
    })
}
path.set("/deleteHotelCommentById",deleteHotelCommentById);

module.exports.path = path;