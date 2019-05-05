let userCon = new Vue({
    el: "#userCon",
    data: {
        activeName: 'first',
        userId: "",
        userPic: './img/19.jpg',
        mode: 'show',
        user: {
            username: '',
            userId: "",
            ctime: "",
            pic: "",
            power: '',
        },
        powerList: {
            "-1": "管理员",
            "0": "普通用户",
            "1": "景区营业者",
            "2": "酒店商户",
            "3": "攻略作者",
            "4": "餐饮商户"
        },
        roomStatus:{
            0:'已预定',
            1:'入住中',
            2:'已退房',
            '-1':'已取消'
        },
        roomStatusClass:{
            0:'booking',
            1:'livein',
            2:'finished',
            '-1':'unbook'
        },
        roomList:[],
        grade:0,
    },
    created() {
        $("#grade").rating();
        if(!window.sessionStorage.getItem('userId')){
            alert("请先登录！")
            window.location.href="http://localhost:8088/login.html";
        }else{
            console.log('aa')
            this.userId = window.sessionStorage.getItem('userId')
            this.getUser();
            this.getBook();
        }

    },
    methods: {
        uploadPhoto(e) {
            var root = this;
            // 利用fileReader对象获取file
            var file = e.target.files[0];
            var filesize = file.size;
            var filename = file.name;
            console.log("压缩前", file.size);
            // 2,621,440   2M
            100304;
            if (filesize > 2101440) {
                // 图片大于2MB
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
                var imgcode = e.target.result;
                root.canvasDataURL(imgcode, res => {
                    //压缩
                    console.log("压缩后", res.length);
                    root.user.pic = res;
                });
            };
        },

        canvasDataURL(path, callback) {
            var img = new Image();
            img.src = path;
            img.onload = function () {
                var that = this;
                var quality = 0.7; // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = 400;
                var anh = document.createAttribute("height");
                anh.nodeValue = 220;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, 400, 220);
                // // 图像质量
                // if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                //   quality = obj.quality;
                // }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL("image/jpeg", quality);
                // 回调函数返回base64的值
                callback(base64);
            };
        },
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
        getUser() {
            let root = this;
            // console.log()
            axios.get('/queryUserByUserId?userId=' + root.userId).then(res => {
                console.log(res)
                root.user = {
                    username: res.data.data[0].username,
                    userId: res.data.data[0].id,
                    pic: res.data.data[0].pic,
                    power: root.powerList[res.data.data[0].power],
                    ctime: root.imeFormatter(res.data.data[0].ctime)
                }
            }).catch(res => {
                console.log('请求失败！')
            })
        },
        getBook(){
            axios.get('/queryBookByUserId?uId='+window.sessionStorage.getItem('userId')).then(res=>{
                console.log(res)
                this.roomList = res.data.data;
            })
        },
        unBook(urId){
            axios.get('/unbook?urId='+urId).then(res=>{
                console.log(res)
                alert('取消成功！')
            })
        },
        submit() {
            let root = this;
            // console.log()
            if (!root.user.username) {
                alert('用户名不能为空！')
            } else {
                axios.post('/changeUserMsg',{
                    id:root.user.userId,
                    username:root.user.username,
                    pic:root.user.pic
                }).then(res=>{
                    window.sessionStorage.setItem('username',root.user.username)
                    window.sessionStorage.setItem('pic',root.user.pic)
                    // console.log(res)
                    this.mode = 'show'
                    window.location.reload()
                }).catch(res=>{
                    console.log('请求失败')
                })
            }
        },
        getGradeForHotel(ubId){
            console.log(ubId)
        }
    }
})




