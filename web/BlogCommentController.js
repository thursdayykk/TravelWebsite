var userDao = require("../dao/UserDao");
var blogCommentDao = require("../dao/BlogCommentDao");
var respUtil = require("../util/RespUtil");
var url = require('url');


var path = new Map();

function addBlogComment(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    // console.log(params)
    blogCommentDao.addBlogComment(params.uId,params.text,params.bId,params.pId,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","评论成功",res));
        resp.end();

    })
}
path.set("/addBlogComment",addBlogComment);

function getCommentByBlogId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    blogCommentDao.getCommentByBlogIdCount(parseInt(params.blogId),res=>{
        blogCommentDao.getCommentByBlogId(parseInt(params.blogId),parseInt(params.page),parseInt(params.pageSize),result =>{
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
path.set("/getCommentByBlogId",getCommentByBlogId);


module.exports.path = path;