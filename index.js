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


//前台
app.post("/userLogin",loader.get("/queryFormalUser"));
app.get("/checkUser",loader.get("/checkUser"));
app.get("/queryUserByUserId",loader.get("/queryUserByUserId"));
app.get("/getHotelCount",loader.get("/getHotelCount"));
app.get("/queryHotel",loader.get("/queryHotel"));
app.get("/queryHotelById",loader.get("/queryHotelById"));

// app.get("/queryCommentByHotelId",loader.get("/queryCommentByHotelId"));
app.post("/bookingRoom",loader.get("/bookingRoom")); //用户预定房子
//UserId,RoomId, insert user_booking,update hotelDetail num = num-1
app.get("/queryBookByUserId",loader.get("/queryBookByUserId"));
//uId
app.get("/unbook",loader.get("/unbook"));

app.post("/addHotelComment",loader.get("/addHotelComment"));
app.get("/getCommentByHotelId",loader.get("/getCommentByHotelId"));



app.listen(globalConfig.port ,function (){
    console.log("服务器已启动");
});

