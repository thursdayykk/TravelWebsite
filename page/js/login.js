var loginForm = new Vue({
    el: "#loginForm",
    data: {
        username: window.sessionStorage.getItem('username'),
        usernameText: "",
        unClass: "",
        password: window.sessionStorage.getItem('password'),
        psdText: "",
        psdClass: "",
        alert: ""
    },
    created() {
        // console.log(window.sessionStorage.getItem('username'))
        // console.log(loginForm)
        // if (window.sessionStorage.getItem('username')) {
        //     console.log(window.sessionStorage.getItem('username'))
        //     loginForm.username = window.sessionStorage.getItem('username');
        //     loginForm.password = window.sessionStorage.getItem('password');
        // }

    },
    methods: {
        login() {
            let isCheckUn = loginForm.checkUserName();
            let isCheckPsd = loginForm.checkPsd();
            if ( isCheckUn && isCheckPsd  ) {
                axios.post('/userLogin', {
                    username: loginForm.username,
                    password: loginForm.password
                }).then(res => {
                    console.log(res)
                    if(res.data.status == 'error'){
                        loginForm.unClass = "has-error";
                        loginForm.psdClass = "has-error";
                        alert(res.data.msg)
                        
                    }else if(res.data.status == 'success'){
                        console.log(res)
                        let data = res.data.data[0]
                        window.sessionStorage.setItem('username',data.username);
                        window.sessionStorage.setItem('password',data.password);
                        window.sessionStorage.setItem('pic',data.pic);
                        window.sessionStorage.setItem('userId',data.id);
                        console.log(window.sessionStorage.getItem('username'))
                        history.back();
                    }
                }).catch(res => {
                    alert('登录失败！')
                })
            }else{
                return
            }

        },
        checkUserName() {
            if (!loginForm.username.trim()) {
                loginForm.usernameText = "用户名不能为空！";
                loginForm.unClass = "has-error";
                return false;
            } else {
                loginForm.usernameText = "";
                loginForm.unClass = "has-success"
                return true;
            }
        },
        checkPsd() {
            if (!loginForm.password.trim()) {
                loginForm.psdText = "密码不能为空！";
                loginForm.psdClass = "has-error";
                return false;
            } else {
                loginForm.psdText = "";
                loginForm.psdClass = "has-success"
                return true;
            }
        },

    }
})