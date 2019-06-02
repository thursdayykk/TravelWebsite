let swiper = new Vue({
    el: '#swiper',
    data: {
        swiperList: [],
        swiperAlt: ['First slide', 'Seconde slide', 'Third slide', 'Fourth slide', 'Fifth slide']
    },
    created() {
        axios.get('/queryRandomScenery').then(res => {
            this.swiperList = res.data.data;
            for (let i = 0; i < this.swiperList.length; i++) {
                this.swiperList[i].alt = this.swiperAlt[i];
            }

        })
    },
    methods:{
        goDetail(id){
            window.location.href="http://localhost:8088/sceneryDetail.html?id="+id;
        }
    }
})


let hotScenery = new Vue({
    el: '#hotScenery',
    data: {
        hotList: [],
    },
    created() {
        axios.get('/queryHotScenery').then(res => {
            this.hotList = res.data.data;

        })
    },
    methods:{
        goDetail(id){
            window.location.href="http://localhost:8088/sceneryDetail.html?id="+id;
        }
    }
})

let kindScenery = new Vue({
    el: '#kindScenery',
    data: {
        areaList: [
            "全部景点",
            "集美区",
            "湖里区",
            "思明区",
            "海沧区",
            "同安区",
            "翔安区"
        ],
        curKind: 0,
        curPage:1,
        pageSize:3,
        totalData:0,
        sceneryList:[],
        pageList:[],
    },
    created() {
        this.getTable();
    },
    methods:{
        getTable(){
            this.pageList = [];
            axios.get('/queryScenery?areaId='+this.curKind+'&page='+(this.curPage -1)+"&pageSize="+this.pageSize).then(res=>{
                this.totalData = res.data.data.count;
                let num = Math.ceil(this.totalData /this.pageSize);
                console.log(res)
                for(let i =0;i<num;i++){
                    this.pageList.push(i+1)
                }
                this.sceneryList = res.data.data.list;
            })
        },
        goDetail(id){
            window.location.href="http://localhost:8088/sceneryDetail.html?id="+id;
        }
    }
})