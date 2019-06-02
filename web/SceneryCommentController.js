var sceneryCommentDao = require("../dao/SceneryCommentDao");
var userDao = require("../dao/UserDao");
var respUtil = require("../util/RespUtil");
var url = require('url');

var path = new Map();

function querySceneryCommentBySceneryId(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(params)
    sceneryCommentDao.queryCommentBySceneryIdCount(parseInt(params.sId),commentCount =>{
        // console.log(commentCount)
        sceneryCommentDao.queryCommentBySceneryId(parseInt(params.sId),parseInt(params.page),parseInt(params.pageSize),comment=>{

            let reList = {};
            reList.commentCount = commentCount[0].count;
            for(let i = 0;i<comment.length;i++){
                userDao.queryUserByUserId(comment[i]['user_id'],user=>{
                    comment[i].userName = user[0].username;
                    if(user[0].pic){
                        comment[i].userPic = user[0].pic.toString();
                    }

                })
                if(comment[i]['parent_id'] != 0){
                    userDao.queryUserByUserId(comment[i]['parent_id'],user=>{
                        comment[i].parentName = user[0].username;
                    })
                }
                if(comment[i].userpic){
                    comment[i].userpic = comment[i].userpic.toString();
                }
            }

            setTimeout(()=>{
                reList.commentList = comment;
                resp.writeHead(200);
                resp.write(respUtil.writeResult("success","查询成功",reList));
                resp.end();
            },500)

        })

    })
}
path.set("/querySceneryCommentBySceneryId",querySceneryCommentBySceneryId);


function addSceneryComment(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(params)
    var params = req.body;
        sceneryCommentDao.addSceneryComment(parseInt(params.sId),parseInt(params.uId),params.username,params.userpic,params.content,res=>{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","插入成功",null));
            resp.end();
        })
}
path.set("/addSceneryComment",addSceneryComment);
module.exports.path = path;