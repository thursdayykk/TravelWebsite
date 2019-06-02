var hotelDetail = new Vue({
    el: '#hotelDetail',
    data: {
        hId: window.location.search,
        hotel: {},
        commentList: [],
        roomList: [],
        showAlert: false,
        message: true,
        msgCon: '',
        messageType: '',
        activeName: 'first',
        isLogin: false,
        commentText: "",
        parentId: 0,
        parentUserName: "",
        commentTotal: 0,
        page: 1,
        pageSize: 10,
        pageNumList: [],
        book: {
            roomId: '',
            dayNum: 1,
            inTimme: '',
        }
    },
    created() {
        if (location.search && location.search.split("=")[1]) {
            this.getHotel();
            if (!window.sessionStorage.getItem('userId')) {
                this.isLogin = true;
            }
            this.getComment();
            if (window.location.hash.split("#")[1] == 'comment') {
                this.activeName = 'second';
            }
        } else {
            window.location.href = "http://localhost:8088/error.html"
        }

    },
    methods: {
        imeFormatter(value) {
            var da = new Date(
                value
                    .replace("/Date(", "")
                    .replace(")/", "")
                    .split("+")[0]
            );
            return (
                da.getFullYear() +
                "-" +
                (da.getMonth() + 1 < 10
                    ? "0" + (da.getMonth() + 1)
                    : da.getMonth() + 1) +
                "-" +
                (da.getDate() < 10 ? "0" + da.getDate() : da.getDate()) +
                " " +
                (da.getHours() < 10 ? "0" + da.getHours() : da.getHours()) +
                ":" +
                (da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes()) +
                ":" +
                (da.getSeconds() < 10 ? "0" + da.getSeconds() : da.getSeconds())
            );
        },
        getHotel() {
            let root = this;
            axios.get('/queryHotelById' + window.location.search).then(res => {
                root.hotel = res.data.data[0];
                console.log(root.hotel)
                root.hotel.device = root.hotel.device.split(",");
            }).catch(res => {
                console.log('酒店详情获取失败！')
            })

            axios.get('/getRoomDetailByHotelId' + window.location.search).then(res => {
                root.roomList = res.data.data
                console.log(this.roomList)
            }).catch(res => {
                console.log('酒店房间获取失败！')
            })
            // axios.get('/queryCommentByHotelId' + window.location.search).then(res => {

            // }).catch(res => {

            // })
        },
        chooseRoom(id) {
            this.book.id = id;
        },
        bookRoom() {
            let rId = this.book.id;
            let uId = window.sessionStorage.getItem('userId')
            if (!uId) {
                // this.showAlert = true;
                alert("请先登录！")
                return;
            }
            if (rId && uId) {
                if (!this.book.inTime) {
                    alert('请填写入住日期！');
                    return;
                }
                if (!this.book.dayNum) {
                    alert('请填写住几晚！');
                    return;
                }
                if (this.book.inTime) {
                    if (new Date().getMonth() + 1 > parseInt(this.book.inTime.split("-")[1])) {
                        alert("请填写正确的入住日期");
                        return;
                    }
                    if (new Date().getMonth() + 1 == parseInt(this.book.inTime.split("-")[1])) {
                        if (new Date().getDate() > parseInt(this.book.inTime.split("-")[2])) {
                            alert("请填写正确的入住日期");
                            return;
                        }
                    }

                }
                axios.post('/bookingRoom', {
                    rId,
                    uId,
                    dayNum: this.book.dayNum,
                    inTime: this.book.inTime
                }).then(res => {
                    $('#myModal').modal('hide')
                    this.messageBox('success', '预定房间成功！')
                }).catch(res => {
                    this.messageBox('error', '预定房间失败！')
                })
            } else {
                this.messageBox('error', '预定房间失败！')
            }


        },
        getComment() {
            let root = this;
            axios.get('/getCommentByHotelId' + window.location.search + '&page=' + (this.page - 1) + "&pageSize=" + this.pageSize)
                .then(res => {
                    console.log(res)
                    // this.commentList = res.data.data;
                    let data = res.data.data;
                    root.commentTotal = data.count;
                    let size = Math.ceil(root.commentTotal / root.pageSize);
                    root.pageNumList = [];
                    for (var i = 0; i < size; i++) {
                        root.pageNumList.push(i + 1);
                    }
                    root.commentList = data.commentList;
                }).catch(res => {

                })
        },
        goLogin() {
            window.location.href = 'http://localhost:8088/login.html';
        },
        messageBox(type, text) {
            this.msgCon = text;
            this.messageType = type;
            $('.messageBox').css({
                'top': parseInt(window.pageYOffset) + 'px',
            }).fadeIn(1000, function () {
                $(this).fadeOut(1500)
            });
        },
        addComment(hId) {
            console.log(hId)
            if (!this.commentText) {
                this.messageBox('error', '评论不能为空')
                return
            } else if (!hId) {
                this.messageBox('error', '评论失败！')
                return
            } else {
                if (!window.sessionStorage.getItem('userId')) {
                    alert('请先登录！')
                    return;
                }
                let hotelId = hId;
                let uId = window.sessionStorage.getItem('userId');
                let username = window.sessionStorage.getItem('username');
                let pic = window.sessionStorage.getItem('pic');
                let text = this.commentText;
                let pId = this.parentId;
                let pun = this.parentUserName;
                // console.log(pun)
                // console.log(pic)
                axios.post('/addHotelComment', {
                    text,
                    uId,
                    hId,
                    username,
                    pic,
                    pId,
                    parentusername: pun
                }).then(res => {
                    this.messageBox('success', '评论成功！');
                    // history.go(0);
                    this.getComment();
                }).catch(res => {
                    this.messageBox('error', '评论失败！')
                })
            }
        },
        reply(cId, username) {
            console.log(cId, username)
            this.parentId = cId;
            this.parentUserName = username;
            this.addComment(this.hId);
        }
    }
})