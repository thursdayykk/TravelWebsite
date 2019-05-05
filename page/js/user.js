var userTop = new Vue({
    el:"#loginTop",
    data:{
        isLogin:true,
        user:{
            username:window.sessionStorage.getItem('username') || "",
            userId:window.sessionStorage.getItem('userId') || "",
            pic:window.sessionStorage.getItem('pic') == 'null' ? './img/19.jpg' :window.sessionStorage.getItem('pic'),
        }
    },
    created(){
       // console.log(window.sessionStorage.getItem('pic') == 'null' ?  './img/19.jpg' : window.sessionStorage.getItem('pic'))
        if(this.user.username && this.user.userId){
            this.isLogin = true;
        }else{
            this.isLogin = false
        }

    },
    methods:{
        loginOut(){
            window.sessionStorage.setItem('username','');
            window.sessionStorage.setItem('password','');
            window.sessionStorage.setItem('pic',null);
            window.sessionStorage.setItem('userId','');
            history.back();
        },
        goCheckUser(){
            window.location.href="http://localhost:8088/userMsg.html";
        }
    }
})