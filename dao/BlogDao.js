var dbutil = require('./DBUtil');


function addBlog(title,destNum,dayNum,content,money,destinations,tags,uId,traffic,pic,live,success){
    var insertSql = "insert into blog (`title`,`destNum`,`dayNum`,`content`,`money`,`destinations`,`tags`,`user_id`,`traffic`,`pic`,`live`) values (?,?,?,?,?,?,?,?,?,?,?)";
    var params = [title,destNum,dayNum,content,money,destinations,tags,uId,traffic,pic,live];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function updateBlog(id,title,destNum,dayNum,content,money,destinations,tags,traffic,pic,live,success){
    var insertSql = "update blog set title=?,destNum=?,dayNum=?,content=?,money=?,destinations=?,tags=?,traffic=?,pic=?,live=? where id = ?";
    var params = [title,destNum,dayNum,content,money,destinations,tags,traffic,pic,live,id]

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function getBlogByUserId(uId,success){

    var insertSql = "select * from blog where user_id = ? order by ctime desc;";
    var params = [uId]
    if(uId == 1){
        insertSql = "select * from blog order by ctime desc;" ;
        params = [];
    }


    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}


function queryBlog(page,pageSize,tagName,success){
    var querySql = "select  id,pic,title,content,destNum,dayNum,destinations from blog where tags like ? order by id desc limit ?,?";
    var params = ['%'+tagName+'%',page *pageSize,pageSize];
    if(tagName == 0){
        querySql = "select  id,pic,title,content,destNum,dayNum,destinations from blog  order by id desc limit ?,?";
        params = [page *pageSize,pageSize];
    }

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function queryHotBlog(success){
    var querySql = "select  id,title from blog order by views desc limit 5";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function queryNewBlog(success){
    var querySql = "select  id,title from blog order by ctime desc limit 5";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function queryRandomBlog(success){
    var querySql = "select id,pic,content,title from blog order By rand(id) limit 3 ";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function queryBlogCount(tagName,success){
    var querySql = "select count(1) as count from blog where tags like ?";
    var params = ['%'+tagName+'%'];
    if(tagName == 0){
        querySql = "select count(1) as count from blog ";
        params = [];
    }

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function queryBlogById(id,success){
    var querySql = "select * from blog where id = ?";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function addView(id,success){
    var querySql = "update blog set views = views + 1 where id = ?";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
function searchBlog(content,success){
    var querySql = "select id,pic,title from blog where title LIKE ?;";
    var params = ['%'+content+'%'];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function deleteBlog(id,success){
    var querySql = "delete from blog where id = ?";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(err,res) =>{
        if(err == null){
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}
module.exports.addBlog = addBlog;
module.exports.updateBlog = updateBlog;
module.exports.getBlogByUserId = getBlogByUserId;
module.exports.queryBlog= queryBlog;
module.exports.queryHotBlog= queryHotBlog;
module.exports.queryRandomBlog= queryRandomBlog;
module.exports.queryBlogCount= queryBlogCount;
module.exports.queryNewBlog= queryNewBlog;
module.exports.queryBlogById= queryBlogById;
module.exports.addView= addView;
module.exports.searchBlog= searchBlog;
module.exports.deleteBlog= deleteBlog;
