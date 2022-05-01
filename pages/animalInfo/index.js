// pages/animalInfo/index.js
Page({
    data: {
        id: null,
        animalInfo: {}
    },
    //获取宠物详情
    async getAnimalInfo() {
        const { userId,id }=this.data
        let animalInfo = {}
        if(userId){
            //登录操作
            const {
                result: {
                    data
                }
            } = await wx.cloud.callFunction({
                name: 'getAnimalInfo',
                data: {
                    userId,
                    animalId:id
                }
            })
            animalInfo = data
            // this.setData({
            //     animalInfo:data
            // })
        }else{
            //非登录操作
            const { data } = await wx.cloud.database().collection('animal').doc(id).get()
            animalInfo = data
        }
        // console.log(animalInfo)
        this.setData({
            animalInfo
        })
    },
    onLoad({
        id
    }) {
        const userInfo = wx.getStorageSync("userInfo")
        console.log(userInfo)
        this.setData({
            id: id,
            userId: userInfo._id
        })
        this.getAnimalInfo()
        //显示转发按钮
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline'],
        })
    },
    //当前页面分享时触发，定义分享内容
    onShareAppMessage() {
        const {
            varieties,
            age
        } = this.data.animalInfo
        return {
            title: varieties + '---' + age + '个月',
            path: `/pages/animalInfo/index?id=${id}`
        }
    },
    //返回首页
    backHome() {
        //关闭所有页面,返回首页
        wx.reLaunch({
            url: '/pages/home/index',
        })
    },
    //关注/取关
    async onLike() {
        const {
            userId,
            id
        } = this.data;
        if (!userId) {
            wx.showToast({
                icon: 'none',
                title: '请登录后重试',
            })
            return;
        }
        wx.showLoading({
            title: '操作中...',
        })
        await wx.cloud.callFunction({
            name: 'patchLike',
            data: {
                userId,
                animalId: id
            }
        })
        this.getAnimalInfo()
        wx.hideLoading()
    },
})