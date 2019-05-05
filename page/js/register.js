var registerForm = new Vue({
    el: "#registerForm",
    data: {
        username: "",
        unClass: "",
        unText: "",
        psd: "",
        psdText: "",
        psdClass: "",
        rePsd: "",
        rePsdText: "",
        rePsdClass: "",
        code: "",
        codeText: "",
        codeClass: "",
        rightCode: "",
        vcode: "",
    },
    created() {
        this.getRandomCode()
    },
    methods: {
        checkUserName() {
            if (!registerForm.username.trim()) {
                registerForm.unText = "用户名不能为空！";
                registerForm.unClass = "has-error";
                return false;
            } else {
                registerForm.unText = "";
                registerForm.unClass = "has-success"
                return true;
            }
        },
        checkPsd() {
            if (!registerForm.psd.trim()) {
                registerForm.psdText = "密码不能为空！";
                registerForm.psdClass = "has-error";
                return false;
            } else {
                registerForm.psdText = "";
                registerForm.psdClass = "has-success"
                return true;
            }
        },
        checkRePsd() {
            if (!registerForm.rePsd.trim()) {
                registerForm.rePsdText = "请再填写一次密码！";
                registerForm.rePsdClass = "has-error";
                return false;
            } else {
                if (registerForm.rePsd != registerForm.psd) {
                    registerForm.rePsdText = "两次密码不一致！";
                    registerForm.rePsdClass = "has-error";
                    return false;
                }
                registerForm.rePsdText = "";
                registerForm.rePsdClass = "has-success"
                return true;
            }
        },
        checkCode() {
            if (!registerForm.code.trim()) {
                registerForm.codeText = "请填写验证码！";
                registerForm.codeClass = "has-error";
                return false;
            } else {
                if (registerForm.code != registerForm.rightCode) {
                    registerForm.codeText = "验证码不正确！";
                    registerForm.codeClass = "has-error";
                    return false;
                }
                registerForm.codeText = "";
                registerForm.codeClass = "has-success"
                return true;
            }
        },
        register() {
            let isPassUn = registerForm.checkUserName();
            let isPassPsd = registerForm.checkPsd();
            let isPassRePsd = registerForm.checkRePsd();
            let isPassCode = registerForm.checkCode();
            if (isPassUn && isPassPsd && isPassRePsd && isPassCode) {
                axios.get('/checkUser?username=' + registerForm.username).then(res => {
                    if (res.data.msg == "不存在此用户") {
                        axios.post('/register', {
                            power: 0,
                            username: registerForm.username,
                            password: registerForm.psd
                        }).then(res => {
                            window.sessionStorage.setItem('username',registerForm.username);
                            window.sessionStorage.setItem('password',registerForm.psd);
                            window.sessionStorage.setItem('pic',null);
                            window.sessionStorage.setItem('userId',res.data.data.insertId);
                            // console.log(res)
                            window.location.href="http://localhost:8088/index.html"
                        }).catch(res => {

                        })
                    } else if(res.data.msg == "已存在此用户") { //存在
                        registerForm.unText = "用户已存在！";
                        registerForm.unClass = "has-error";
                        // return;
                    }
                }).catch(res => {

                })

            }
        },
        getRandomCode() {
            axios({
                method: "get",
                url: "/getRandomCode"
            }).then(res => {
                // console.log(res)
                registerForm.vcode = res.data.data.data;
                registerForm.rightCode = res.data.data.text;
            }).catch(res => {
                console.log("请求失败！")
            })
        }
    }
})