let scenery = new Vue({
    el:'#scenery',
    data:{
        commentList:[],
        scenery:{},
        totalComment:0,
        pageList:[],
        curPage:1,
        pageSize:10,
        content:'',
    },
    created(){
        if(location.search && location.search.split("=")[1]){
            this.getScenery();
            this.getComment();
        }else{
            window.location.href="http://localhost:8088/error.html"
        }
    },
    methods:{
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
        getScenery(){
        axios.get('/querySceneryById?id='+ location.search.split("=")[1]).then(res=>{
            // console.log(res)
            this.scenery = res.data.data[0]
        })
        },
        getComment(){
            this.pageList = [];
            axios.get('/querySceneryCommentBySceneryId?sId='+ location.search.split("=")[1]+"&page="+(this.curPage-1)+"&pageSize="+this.pageSize).then(res=>{
                this.totalComment = res.data.data.commentCount;
                let num = Math.ceil(this.totalComment /this.pageSize);
                console.log(res)
                for(let i =0;i<num;i++){
                    this.pageList.push(i+1)
                }
                this.commentList = res.data.data.commentList
            })
        },
        addComment(){
            if(!this.content){
                alert('评论为空！');
                return false;
            }else{
                console.log(this.scenery.id)
                if(!window.sessionStorage.getItem('userId')){
                    alert('请先登录！')
                    return ;
                }
                axios.post('/addSceneryComment',{
                    sId:this.scenery.id,
                    uId:window.sessionStorage.getItem('userId'),
                    pic:window.sessionStorage.getItem('pic'),
                    username:window.sessionStorage.getItem('username'),
                    content:this.content
                }).then(res=>{
                    this.content = '';
                    this.curPage = 1;
                    this.getComment();
                })
            }
        }
    }

})