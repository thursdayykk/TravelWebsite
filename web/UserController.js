var userDao = require("../dao/UserDao");
var respUtil = require("../util/RespUtil");
var url = require('url');
var captcha = require("svg-captcha");

var path = new Map();

//登录时的
function queryUserByUserName(req,resp){
    // var params = url.parse(req.url,true).query;
    var params = req.body;
    userDao.queryUserByUserName(params.username,res =>{
        if(res[0].password == params.password){
            if(res[0].pic){
                res[0].pic = res[0].pic.toString();
            }
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","登录成功",res));

        }else{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("error","密码或账号错误",null));
        }
        resp.end();

    })
}
path.set("/queryUserByUserName",queryUserByUserName);

function getRandomCode(req,resp){
    var img = captcha.create({fontSize:50,width:100,height:34});
    // console.log(img);
    resp.writeHead(200);
    resp.write(respUtil.writeResult("success","验证码获取成功",img));
    resp.end();
}
path.set("/getRandomCode",getRandomCode);


//查找用户完整信息
function getUserByUserName(req,resp){
    var params = url.parse(req.url,true).query;
    // console.log(req)
    // var params = req.body;
    userDao.queryUserByUserName(params.username,res =>{
            resp.writeHead(200);
            if(params.mode == 'full'){
                if(res[0].pic){
                    res[0].pic = res[0].pic.toString();
                }
            }

            // console.log(res)
            resp.write(respUtil.writeResult("success","查询成功",res));
            resp.end();

    })
}
path.set("/getUserByUserName",getUserByUserName);

function addUser(req,resp){
    // var params = url.parse(req.url,true).query;
    // console.log(req)
    var params = req.body;
    userDao.addUser(params.username,params.password,params.power,res =>{
        console.log(res)
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","注册成功",res));
        resp.end();
    })
}
path.set("/addUser",addUser);
function updateUser (req,resp){
    var params = req.body;
    userDao.updateUser(params.username,params.pic,params.id,res =>{
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","修改成功",res));
        resp.end();
    })
}
path.set("/updateUser",updateUser);







//普通用户
function queryFormalUser(req,resp){
    var params = req.body;
    console.log(params)
    userDao.queryUserByUserName(params.username,res =>{
        console.log(res)
        if(res.length > 0){
            if(res[0].power != 0){
                resp.writeHead(200);
                resp.write(respUtil.writeResult("error","非普通用户请使用商户端登录！",null));
            }else{
                if(res[0].password == params.password){
                    if(res[0].pic){
                        res[0].pic = res[0].pic.toString();
                    }
                    resp.writeHead(200);
                    resp.write(respUtil.writeResult("success","登录成功",res));

                }else{
                    resp.writeHead(200);
                    resp.write(respUtil.writeResult("error","密码或账号错误",null));
                }
            }
        }else{
            console.log(res)
            resp.writeHead(200);
            resp.write(respUtil.writeResult("error","不存在此用户",null));
        }


        resp.end();

    })
}

path.set("/queryFormalUser",queryFormalUser);

function checkUser(req,resp){
    var params = url.parse(req.url,true).query;
    userDao.queryUserName(params.username,res =>{
        console.log(res)
        if(!res[0]){
            console.log('1')
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","不存在此用户",null ));

        }else{
            console.log('2')
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","已存在此用户",null));
        }
        resp.end();

    })
}

path.set("/checkUser",checkUser);


function queryUserByUserId(req,resp){
    var params = url.parse(req.url,true).query;
    userDao.queryUserByUserId(params.userId,res =>{
        if(res[0].pic){
            res[0].pic = res[0].pic.toString()
        }
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",res ));
            resp.end();
    })
}

path.set("/queryUserByUserId",queryUserByUserId);
module.exports.path = path;