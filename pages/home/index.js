// pages/home/index.js
Page({
    data: {
        swiper: ['../../assets/image/swiper1.jpg', '../../assets/image/swiper2.jpg', '../../assets/image/swiper3.jpg'],
        active: 3,
        tabList: [{
            title: '喵星',
            id: 3
        }, {
            title: '汪星',
            id: 4
        }, {
            title: '其他',
            id: 0
        }],
        animalList: [],
        windowHeight:0,
        animalList: [],
        pageSize: 5,
        pageIndex: 1,
        triggered: false
    },
    // 页面初始化执行一次
    onLoad() {
        this.getTabBar().setData({
            active: 'home'
        })
        const {windowHeight}=wx.getWindowInfo()
        this.setData({
            windowHeight:windowHeight-50
        })
        //调用宠物列表
        this.getAnimalList()
    },
    //切换类型
    setActive(e) {
        this.setData({
            active: e.currentTarget.dataset.id,
            pageIndex:1,
            animalList:[]
        })
        this.getAnimalList()
    },
    //获取宠物列表
    async getAnimalList(){
        const { active, pageIndex, pageSize, animalList } = this.data
        const { result: { data } } = await wx.cloud.callFunction({
          name: 'getAnimalList',
          data: {
            type: active,
            pageIndex,
            pageSize
          }
        })
        this.setData({
            animalList: Array.from(new Set([...animalList, ...data].map(item => JSON.stringify(item)))).map(item => JSON.parse(item)),
            triggered: false
        })
        // console.log(data)
    },
    onShow(){
        this.getAnimalList()
    },
    //上拉加载
    scrolltolower(){
        this.setData({
            pageIndex:this.data.pageIndex+=1
        })
        this.getAnimalList()
    },
    //下拉刷新
    refresherrefresh(){
        this.setData({
            active: 3,
            pageIndex:1,
            animalList:[]
        })
        this.getAnimalList()
    }
})