var app = new Vue({
    el: "#app",
    data: {
        chooseArea: '0',
        chooseType:'0',
        page:1,
        pageSize:10,
        totalData:0,
        pageNumList:[1,2,3],
        hotelList:[],
        areaList: [
            '全部',
            "集美区",
            "湖里区",
            "思明区",
            "海沧区",
            "同安区",
            "翔安区"
        ],
        hotelType:[
            '全部',
            '经济酒店',
            '星级酒店',
            '民宿',
            '豪华宾馆'
        ]
    },
    watch:{
        chooseArea(){
            this.page = 1;
            this.getHotel()
        },
        chooseType(){
            this.page = 1;
            this.getHotel()
        }
    },
    created() {
        this.getHotel()
    },
    methods:{
        getHotel(){
            let root =this;
            axios.get('/queryHotel?areaId='+root.chooseArea
            +"&type="+root.chooseType
            +"&page="+(root.page -1)
            +"&pageSize="+root.pageSize).then(res=>{
                let data = res.data.data;
                root.totalData = data.count;
                let size = Math.ceil(root.totalData / root.pageSize);
                root.pageNumList = [];
                for(var i =0;i<size;i++){
                    root.pageNumList.push(i+1);
                }
                root.hotelList = data.hotelList;
                root.hotelList.forEach(el=>{
                    el.device = el.device.split(",")
                })
            }).catch(res=>{
                console.log(res)
            })
        }
    }
})