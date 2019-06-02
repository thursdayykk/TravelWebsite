var sceneryDao = require("../dao/SceneryDao");

var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function addScenery(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    // console.log(params)
    sceneryDao.addScenery(params.name,params.pic,params.content,params.address,params.phone,params.traffic,params.opentime,params.areaId,params.userId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","插入成功",null));
        resp.end();
    })


}
path.set("/addScenery",addScenery);

function updateScenery(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    // console.log(params)
    sceneryDao.updateScenery(params.id,params.name,params.pic,params.content,params.address,params.phone,params.traffic,params.opentime,params.areaId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","修改成功",null));
        resp.end();
    })


}
path.set("/updateScenery",updateScenery);

function getSceneryByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    sceneryDao.getSceneryByUserId(params.uId,res =>{
        // console.log(res)
        for(let i = 0;i<res.length;i++){

                res[i].pic = res[i].pic.toString();
            // console.log(res[i])
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/getSceneryByUserId",getSceneryByUserId);



function queryHotScenery(req,resp){
    sceneryDao.queryHotScenery(res =>{
        // console.log(res)
        for(let i = 0;i<res.length;i++){

            res[i].pic = res[i].pic.toString();
            // console.log(res[i])
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryHotScenery",queryHotScenery);
function queryRandomScenery(req,resp){
    sceneryDao.queryRandomScenery(res =>{
        // console.log(res)
        for(let i = 0;i<res.length;i++){

            res[i].pic = res[i].pic.toString();
            // console.log(res[i])
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryRandomScenery",queryRandomScenery);

function queryScenery(req,resp){
    var params = url.parse(req.url,true).query;
    sceneryDao.querySceneryCount(parseInt(params.areaId),result =>{
        sceneryDao.queryScenery(parseInt(params.page),parseInt(params.pageSize),parseInt(params.areaId),res =>{
            // console.log(res)
            let reList = {};
            reList.count = result[0].count;
            for(let i = 0;i<res.length;i++){

                res[i].pic = res[i].pic.toString();
                // console.log(res[i])
            }
            reList.list = res;
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",reList));
            resp.end();
        })
    })

}
path.set("/queryScenery",queryScenery);

function querySceneryById(req,resp){
    var params = url.parse(req.url,true).query;
    sceneryDao.querySceneryById(parseInt(params.id),scenery =>{
        scenery[0].pic = scenery[0].pic.toString();
        addViews(parseInt(params.id));
        resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功",scenery));
                resp.end();

    })

}
path.set("/querySceneryById",querySceneryById);

function deleteScenery(req,resp){
    var params = url.parse(req.url,true).query;
    sceneryDao.deleteScenery(parseInt(params.id),scenery =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",null));
        resp.end();

    })

}
path.set("/deleteScenery",deleteScenery);

module.exports.path = path;

function addViews(sId){
    sceneryDao.addViews(sId,res=>{})
}