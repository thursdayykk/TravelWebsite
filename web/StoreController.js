var storeDao = require("../dao/StoreDao");
var storeFoodDao = require("../dao/StoreFoodDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function addStore(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    // console.log(params)
    storeDao.addStore(params.name,params.pic,params.address,params.money,params.opentime,params.phone,params.areaId,params.typeId,parseInt(params.uId),res =>{
        if(params.addFoodList.length > 0){
            for(let i =0;i<params.addFoodList.length;i++){
                storeFoodDao.addFood(res.insertId,params.addFoodList[i].name,params.addFoodList[i].pic,params.addFoodList[i].money,result =>{})
            }
        }
        setTimeout(()=>{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","插入成功",null));
            resp.end();
        },500)

    })


}
path.set("/addStore",addStore);
function updateStore(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    // console.log(params)
    storeDao.updateStore(params.id,params.name,params.pic,params.address,params.money,params.opentime,params.phone,params.areaId,params.typeId,res =>{
        if(params.addFoodList.length > 0){
            for(let i =0;i<params.addFoodList.length;i++){
                storeFoodDao.addFood(params.id,params.addFoodList[i].name,params.addFoodList[i].pic,params.addFoodList[i].money,result =>{})
            }
        }
        if(params.updateFoodList.length > 0){
            for(let i =0;i<params.updateFoodList.length;i++){
                storeFoodDao.updateFood(params.updateFoodList[i].id,params.updateFoodList[i].name,params.updateFoodList[i].pic,params.updateFoodList[i].money,result =>{})
            }
        }
        setTimeout(()=>{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","修改成功",null));
            resp.end();
        },500)

    })


}
path.set("/updateStore",updateStore);


function getStoreByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    storeDao.getStoreByUserId(params.uId,res =>{
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
path.set("/getStoreByUserId",getStoreByUserId);


function queryStore(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)
    storeDao.queryStoreCount(parseInt(params.areaId),parseInt(params.typeId),count=>{
        storeDao.queryStore(parseInt(params.areaId),parseInt(params.typeId),parseInt(params.page),parseInt(params.pageSize),res =>{
            let reList = {};
            reList.count = count[0].count;
            for(let i =0;i<res.length;i++){
                if(res[i].pic){
                    res[i].pic = res[i].pic.toString();
                }
            }
            reList.storeList = res;
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",reList));
            resp.end();
        })
    })

}
path.set("/queryStore",queryStore);
function queryStoreById(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;
    // console.log(params)

        storeDao.queryStoreById(parseInt(params.id),store =>{
            let reList = {};
            store[0].pic = store[0].pic.toString();
            reList.store = store[0];
            storeFoodDao.getFood(parseInt(params.id),res =>{
                for(let i =0;i<res.length;i++){
                    if(res[i].pic){
                        res[i].pic = res[i].pic.toString();
                    }
                }
                reList.storeFood = res;
                resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功",reList));
                resp.end();
            })


        })


}
path.set("/queryStoreById",queryStoreById);
function queryHotStore(req,resp){
    var params = url.parse(req.url,true).query;
    // var params = req.body;

    storeDao.queryHotStore(res =>{
        for(let i =0;i<res.length;i++){
            res[i].pic = res[i].pic.toString()
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryHotStore",queryHotStore);
function deleteStore(req,resp){
    var params = url.parse(req.url,true).query;
    storeDao.deleteStore(parseInt(params.id),res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",null));
        resp.end();

    })

}
path.set("/deleteStore",deleteStore);
module.exports.path = path;