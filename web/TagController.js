var tagDao = require("../dao/TagDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function queryTag(req,resp){
    tagDao.queryTag(res=>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryTag",queryTag);

module.exports.path = path;