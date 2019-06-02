var dbutil = require('./DBUtil');

function addBlogTagMapping(tId,bId,success){
    var insertSql = "insert into blog_tag_mapping (`tag_id`,`blog_id`) values (?,?)";
    var params = [tId,bId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

function deleteBlogTagMapping(tId,bId,success){
    var insertSql = "delete from blog_tag_mapping where tag_id = ? and blog_id = ?";
    var params = [tId,bId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,(err,res) =>{
        if(err == null){
            console.log(res)
            success(res)
        }else{
            console.log(err)
        }
    });
    connection.end();
}

module.exports.addBlogTagMapping = addBlogTagMapping;
module.exports.deleteBlogTagMapping = deleteBlogTagMapping;