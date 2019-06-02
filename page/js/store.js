let store = new Vue({
    el: '#store',
    data: {
        areaList: [
            "全部",
            "集美区",
            "湖里区",
            "思明区",
            "海沧区",
            "同安区",
            "翔安区"
        ],
        typeList: [
            "全部",
            "西餐",
            "中餐",
            "粤菜",
            "新疆菜",
            "面馆",
            "甜品",
            "饮品"
        ],
        areaId:0,
        typeId:0,
        curPage: 1,
        pageSize: 10,
        pageList: [],
        storeList: [],
        hotStore:[],
    },
    created(){
        this.getTable();
        this.getHotStore();
    },
    watch:{
        areaId(){
            this.getTable()
        },
        typeId(){
            this.getTable();
        }
    },
    methods:{
        getTable(){
            this.pageList = [];
            axios.get('/queryStore?areaId='+this.areaId+"&typeId="+this.typeId+"&page="+(this.curPage-1)+"&pageSize="+this.pageSize).then(res=>{
                let num = Math.ceil(res.data.data.count /this.pageSize);
                // console.log(res)
                for(let i =0;i<num;i++){
                    this.pageList.push(i+1)
                }
                this.storeList = res.data.data.storeList;
            })
        },
        goDetail(id){
            window.location.href="http://localhost:8088/storeDetail.html?id="+id;
        },
        getHotStore(){
            axios.get('/queryHotStore').then(res=>{
                this.hotStore = res.data.data
            })
        }
    }
})