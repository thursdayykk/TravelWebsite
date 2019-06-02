var userDao = require("../dao/UserDao");
var storeCommentDao = require("../dao/StoreCommentDao");
var respUtil = require("../util/RespUtil");
var url = require('url');


var path = new Map();

function addStoreComment(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    // console.log(params)
    storeCommentDao.addStoreComment(params.uId,params.text,params.sId,params.pId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","评论成功",res));
        resp.end();

    })
}
path.set("/addStoreComment",addStoreComment);

function getCommentByStoreId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    storeCommentDao.getCommentByStoreIdCount(parseInt(params.storeId),res=>{
        storeCommentDao.getCommentByStoreId(parseInt(params.storeId),parseInt(params.page),parseInt(params.pageSize),result =>{
            for(let i = 0;i<result.length;i++){
                userDao.queryUserByUserId(result[i]['user_id'],user=>{
                    result[i].userName = user[0].username;
                    if(user[0].pic){
                        result[i].userPic = user[0].pic.toString();
                    }

                })
                if(result[i]['parent_id'] != 0){
                    console.log(result[i]['parent_id'])
                    userDao.queryUserByUserId(result[i]['parent_id'],user=>{

                        result[i].parentName = user[0].username;
                    })
                }

            }
            setTimeout(()=>{
                resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功", {
                    commentList:result,
                    count:res[0].count
                }));
                resp.end();
            },500)


        })
    })

}
path.set("/getCommentByStoreId",getCommentByStoreId);


module.exports.path = path;