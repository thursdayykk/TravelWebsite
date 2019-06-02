let swiper = new Vue({
    el: '#swiper',
    data: {
        swiperList: [],
    },
    created() {
        axios.get('/queryRandomBlog').then(res => {
            this.swiperList = res.data.data;
        }).catch(res => {
            console.log(res);
        })
    },
    methods:{
        goSearch(){
            
        }
    }
})
let blog = new Vue({
    el:'#blog',
    data:{
        blogList:[],
        pageList:[],
        curPage:1,
        pageSize:10,
        tagList:[],
        hotBlogList:[],
        newBlogList:[],
        activeTagId:0,
        tagName:0,
    },
    created(){
        this.getData();
        this.getTag();
        this.getHotBlog();
        this.getNewBlog();
    },
    watch:{
        activeTagId(index){
            this.tagList.forEach((el)=>{
                if(el.id == index){
                    this.tagName = el.name;
                }
                
            });
        },
        tagName(){
            this.getData();
        }
    },
    methods:{
        getData(){
            this.pageList = [];
            axios.get('/queryBlog?page='+(this.curPage -1)+"&pageSize="+this.pageSize+"&tagName="+this.tagName).then(res=>{
                let num = Math.ceil(res.data.data.count /this.pageSize);
                // console.log(res)
                for(let i =0;i<num;i++){
                    this.pageList.push(i+1)
                }
                this.blogList = res.data.data.blogList;
                this.blogList.forEach(el=>{
                    el.destinations = el.destinations.split(",")
                })
            })
        },
        goDetail(id){
            window.location.href="http://localhost:8088/blogDetail.html?id="+id;
        },
        getTag(){
            axios.get('/queryTag').then(res=>{
                this.tagList = res.data.data;
            })
        },
        getHotBlog(){
            axios.get('/queryHotBlog').then(res=>{
                this.hotBlogList = res.data.data;
            })
        },
        getNewBlog(){
            axios.get('/queryNewBlog').then(res=>{
                this.newBlogList = res.data.data;
            })
        },
    }
})
