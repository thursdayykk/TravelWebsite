var shecduleDao = require("../dao/ShecduleDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function getSheduleByBlogId(req,resp){
    var params = url.parse(req.url,true).query;
    shecduleDao.getSheduleByBlogId(params.bId,res=>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}

path.set("/getSheduleByBlogId",getSheduleByBlogId);


module.exports.path = path;
