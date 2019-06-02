let search = new Vue({
    el:'#search',
    data:{
        searchWord:'',
        blogList:[],
        hotelList:[],
        storeList:[],
        sceneryList:[]
    },
    created(){

    },
    methods:{
        search(){
            // console.log(this.searchWord)
            if(this.searchWord){
                axios.get('/search?searchWord='+this.searchWord).then(res=>{
                   
                    this.blogList = res.data.data.blog;
                    this.hotelList= res.data.data.hotel;
                    this.sceneryList = res.data.data.scenery;
                    this.storeList= res.data.data.store;
                })
            }
            
        },
        detail(kind,id){
            if(kind == 'scenery'){
                window.location.href = 'http://localhost:8088/sceneryDetail.html?id='+id
            }else if(kind=='blog'){
                window.location.href = 'http://localhost:8088/blogDetail.html?id='+id
            }else if(kind == 'store'){
                window.location.href = 'http://localhost:8088/storeDetail.html?id='+id
            }else if(kind == 'hotel'){
                window.location.href = 'http://localhost:8088/hotelDetail.html?hotelId='+id
            }
           
        }

    }
})