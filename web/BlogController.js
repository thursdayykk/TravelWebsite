var blogDao = require("../dao/BlogDao");
var tagDao = require("../dao/TagDao");
var shecduleDao = require("../dao/ShecduleDao");
var blogTagMappingDao = require("../dao/BlogTagMappingDao");
var respUtil = require("../util/RespUtil");
var url = require('url');
// var request = require('request');

var path = new Map();

function addBlog(req,resp){
    var params = req.body;
    blogDao.addBlog(params.title,params.destNum,params.dayNum,params.content,params.money,params.destinations,params.tags,params.uId,params.traffic,params.pic,params.live, (res) =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","添加成功",res));
        resp.end();

        var blogId = res.insertId;
        // console.log()
        var tagList = params.tags.split(",");
        for(var i = 0; i < tagList.length; i++){
            if(tagList[i] == ""){
                continue;
            }
            queryTag(tagList[i],blogId)
        }

        for(let i =0;i<params.addShedule.length;i++){
            addShedule(params.addShedule[i],blogId)
        }
    });
}
path.set("/addBlog",addBlog);

function updateBlog(req,resp){
    var params = req.body;
    blogDao.updateBlog(params.id,params.title,params.destNum,params.dayNum,params.content,params.money,params.destinations,params.tags,params.traffic,params.pic,params.live, (res) =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","添加成功",res));
        resp.end();

        var blogId = params.id;
        // console.log()
        var tagList = params.tags.split(",");
        for(var i = 0; i < tagList.length; i++){
            if(tagList[i] == ""){
                continue;
            }
            queryTag(tagList[i],blogId)
        }

        for(let i =0;i<params.addShedule.length;i++){
            addShedule(params.addShedule[i],blogId)
        }
        for(let i =0;i<params.updateShedule.length;i++){
            console.log(params.updateShedule[i])
            updateShedule(params.updateShedule[i])
        }
        for(let i =0;i<params.deleteTagList.length;i++){
            tagDao.queryTagByName(params.deleteTagList[i],res =>{
                if(res == null || res.length == 0){
                    // continue;
                }else{
                    //存在此标签，则只需删除映射
                    blogTagMappingDao.deleteBlogTagMapping(res[0].id,blogId,res => {});
                }
            })
        }
    });
}
path.set("/updateBlog",updateBlog);

function getBlogByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.getBlogByUserId(params.uId,res=>{
        for(let i =0;i<res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/getBlogByUserId",getBlogByUserId);


function queryBlog(req,resp){
    var params = url.parse(req.url,true).query;
    console.log(params)
    blogDao.queryBlogCount(params.tagName,count=>{
        blogDao.queryBlog(parseInt(params.page),parseInt(params.pageSize),params.tagName,res=>{
            let reList = {};
            reList.count = count[0].count;
            for(let i =0;i< res.length;i++){
                res[i].pic = res[i].pic.toString();
            }
            reList.blogList = res;
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",reList));
            resp.end();
        })
    })

}
path.set("/queryBlog",queryBlog);

function queryHotBlog(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.queryHotBlog(res=>{

        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryHotBlog",queryHotBlog);

function queryNewBlog(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.queryNewBlog(res=>{

        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryNewBlog",queryNewBlog);

function queryRandomBlog(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.queryRandomBlog(res=>{
        for(let i =0;i< res.length;i++){
            res[i].pic = res[i].pic.toString();
        }
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",res));
        resp.end();
    })
}
path.set("/queryRandomBlog",queryRandomBlog);


function queryBlogById(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.queryBlogById(params.id,result=>{
        for(let i =0;i< result.length;i++){
            result[i].pic = result[i].pic.toString();
        }
        shecduleDao.getSheduleByBlogId(params.id,res=>{

            result[0].shecdule = res;
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",result));
            resp.end();
            blogDao.addView(params.id,res=>{})
        })

    })
}
path.set("/queryBlogById",queryBlogById);

function deleteBlog(req,resp){
    var params = url.parse(req.url,true).query;
    blogDao.deleteBlog(parseInt(params.id),res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","删除成功",null));
        resp.end();

    })

}
path.set("/deleteBlog",deleteBlog);



module.exports.path = path;


function queryTag(tag,blogId){
    tagDao.queryTagByName(tag,res =>{
        if(res == null || res.length == 0){
            //如果不存在tag 则插tag在插映射
            insertTag(tag,blogId)
        }else{
            //存在此标签，则只需插入映射
            blogTagMappingDao.addBlogTagMapping(res[0].id,blogId,res => {});
        }
    })
}

function insertTag(name,blogId){
    tagDao.addTag(name,(res) =>{
        insertTagBlogMapping(res.insertId,blogId)
    })
}

function insertTagBlogMapping(tagId,blogId){
    blogTagMappingDao.addBlogTagMapping(tagId,blogId,(res) =>{})
}

function addShedule(item,bId){
    shecduleDao.addShedule(bId,item.destination,item.content,item.day,item.traffic,item.store,res=>{})
}
function updateShedule(item){
    shecduleDao.updateShedule(item.id,item.destination,item.content,item.day,item.traffic,item.store,res=>{})
}