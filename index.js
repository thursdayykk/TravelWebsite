var express = require('express');
var globalConfig = require('./config');
var loader = require("./loader");




var app = new express();

app.use(express.static("./page/"));//设置静态文件地址
//默认进入 page/index.html
app.use(express.json());


app.post("/queryUserByUserName",loader.get("/queryUserByUserName"));
app.get("/getRandomCode",loader.get("/getRandomCode"));
app.get("/getUserByUserName",loader.get("/getUserByUserName"));
app.post("/register",loader.get("/addUser"));
// console.log(loader.get("/updateUser"))
app.post("/changeUserMsg",loader.get("/updateUser"));

//酒店
app.get("/getHotelByUserId",loader.get("/getHotelByUserId"));
app.get("/getRoomDetailByHotelId",loader.get("/queryRoomDetailByHotelId"));
app.post("/addHotel",loader.get("/insertHotel"));
app.post("/updateHotel",loader.get("/updatetHotel"));
app.post("/deleteRoomDetail",loader.get("/deleteRoomDetail"));
app.get("/getBookByHotelId",loader.get("/getBookByHotelId"));
//hotel_id -> hote_detail_id -> user_book_id
app.get("/changeBookStatus",loader.get("/changeBookStatus"));
app.post("/deleteHotelCommentById",loader.get("/deleteHotelCommentById"));
app.get("/deleteBookByRoomId",loader.get("/deleteBookByRoomId"));


//美食
app.get("/getStoreByUserId",loader.get("/getStoreByUserId"));
app.get("/getFood",loader.get("/getFood"));
app.post("/addStore",loader.get("/addStore"));
app.post("/updateStore",loader.get("/updateStore"));

//景区
app.post("/addScenery",loader.get("/addScenery"));
app.post("/updateScenery",loader.get("/updateScenery"));
app.get("/getSceneryByUserId",loader.get("/getSceneryByUserId"));

//攻略
app.post("/addBlog",loader.get("/addBlog"));
app.post("/updateBlog",loader.get("/updateBlog"));
app.get("/getBlogByUserId",loader.get("/getBlogByUserId"));
app.get("/getSheduleByBlogId",loader.get("/getSheduleByBlogId"));

//用户管理
app.get("/queryUser",loader.get("/queryUser"));

//前台
app.post("/userLogin",loader.get("/queryFormalUser"));
app.get("/checkUser",loader.get("/checkUser"));
app.get("/queryUserByUserId",loader.get("/queryUserByUserId"));
app.get("/getHotelCount",loader.get("/getHotelCount"));
app.get("/queryHotel",loader.get("/queryHotel"));
app.get("/queryHotelById",loader.get("/queryHotelById"));
app.get("/queryHotHotel",loader.get("/queryHotHotel"));

// app.get("/queryCommentByHotelId",loader.get("/queryCommentByHotelId"));
app.post("/bookingRoom",loader.get("/bookingRoom")); //用户预定房子
//UserId,RoomId, insert user_booking,update hotelDetail num = num-1
app.get("/queryBookByUserId",loader.get("/queryBookByUserId"));
//uId
app.get("/unbook",loader.get("/unbook"));

app.post("/addHotelComment",loader.get("/addHotelComment"));
app.get("/getCommentByHotelId",loader.get("/getCommentByHotelId"));

app.get("/queryHotScenery",loader.get("/queryHotScenery"));//by views limit 3
app.get("/queryRandomScenery",loader.get("/queryRandomScenery"));//5个
app.get("/queryScenery",loader.get("/queryScenery"));
app.get("/querySceneryById",loader.get("/querySceneryById"));
app.get("/querySceneryCommentBySceneryId",loader.get("/querySceneryCommentBySceneryId"));
app.post("/addSceneryComment",loader.get("/addSceneryComment"));

app.get("/queryHotBlog",loader.get("/queryHotBlog"));//by views limit 3
app.get("/queryRandomBlog",loader.get("/queryRandomBlog"));//5个
app.get("/queryBlog",loader.get("/queryBlog"));
app.get("/queryNewBlog",loader.get("/queryNewBlog"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.get("/getCommentByBlogId",loader.get("/getCommentByBlogId"));
app.post("/addBlogComment",loader.get("/addBlogComment"));

app.get("/queryTag",loader.get("/queryTag"));


app.get("/queryStore",loader.get("/queryStore"));
app.get("/queryStoreById",loader.get("/queryStoreById"));
app.get("/getCommentByStoreId",loader.get("/getCommentByStoreId"));
app.post("/addStoreComment",loader.get("/addStoreComment"));
app.get("/queryHotStore",loader.get("/queryHotStore"));

app.get("/search",loader.get("/search"));

app.get("/deleteStore",loader.get("/deleteStore"));
app.get("/deleteHotel",loader.get("/deleteHotel"));
app.get("/deleteBlog",loader.get("/deleteBlog"));
app.get("/deleteScenery",loader.get("/deleteScenery"));


app.listen(globalConfig.port ,function (){
    console.log("服务器已启动");
});

