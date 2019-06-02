var storeFoodDao = require("../dao/StoreFoodDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();


function getFood(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    storeFoodDao.getFood(params.sId,res =>{
        for(let i =0;i<res.length;i++){
            if(res[i].pic){
                res[i].pic = res[i].pic.toString();
            }
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/getFood",getFood);
module.exports.path = path;