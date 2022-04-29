// pages/animalInfo/index.js
Page({
    data: {
        id:null,
        animalInfo:{}
    },
    //获取宠物详情
    async getAnimalInfo(){
        const { result: { data } }=await wx.cloud.callFunction({
            name:'getAnimalInfo',
            data:{
                id:this.data.id
            }
        })
        this.setData({
            animalInfo:data
        })
        console.log(data)
    },
    onLoad: function ({id}) {
        this.setData({
            id:id
        })
        this.getAnimalInfo()
        //显示转发按钮
        wx.showShareMenu({
          menus: ['shareAppMessage', 'shareTimeline'],
        })
    },
    //当前页面分享时触发，定义分享内容
    onShareAppMessage(){
        const {varieties,age}=this.data.animalInfo
        return{
            title:varieties + '---'+age+'个月',
            path:`/pages/animalInfo/index?id=${id}`
        }
    }
})