var blogDao = require("../dao/BlogDao");
var storeDao = require("../dao/StoreDao");
var hotelDao = require("../dao/HotelDao");
var sceneryDao = require("../dao/SceneryDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function search(req,resp){
    var params = url.parse(req.url,true).query;
    let reList = {}
    blogDao.searchBlog(params.searchWord,res =>{
        // console.log(res)
        for(let i =0;i< res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        reList.blog = res;
    })
    storeDao.searchStore(params.searchWord,res =>{
        for(let i =0;i< res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        reList.store = res;
    })
    sceneryDao.searchScenery(params.searchWord,res =>{
        for(let i =0;i< res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        reList.scenery = res;
    })
    hotelDao.searchHotel(params.searchWord,res =>{
        for(let i =0;i< res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        reList.hotel = res;
    })

    setTimeout(()=>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",reList));
        resp.end();
    },500)

}
path.set("/search",search );


module.exports.path = path;