let date = new Vue({
    el: '#index',
    data: {
        date: new Date(),
        search:''
    },
    created() {
        let _this = this;
        this.timer = setInterval(function () {
            _this.date = new Date().toLocaleString();
        });
    },
    beforeDestroy: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods:{
        goSearch(){
            // axios.get('/search?content='+this.search).then(res=>{
            //     console.log(res)
            // })
            window.location.href="http://localhost:8088/search.html"
        }
    }
})