// pages/mine/index.js
Page({
    data: {
        userInfo:null
    },
    //进入我的关注
    toMyLike(){
        wx.navigateTo({
          url: '/pages/myLike/index',
        })
    },
    /*用户授权*/
    async login(){
        // console.log("获取到用户信息")
        //用户授权
        const { userInfo:{nickName,avatarUrl} } = await wx.getUserProfile({
            desc:'用于完善个人信息'
        })
        //将用户信息交付后台
        const {result:{data}}=await wx.cloud.callFunction({
            name:'login',
            data:{
                nickName,
                avatarUrl
            }
        })
        //将用户信息存储
        wx.setStorageSync('userInfo', data)
        // console.log(data)
        this.setData({
            userInfo:data
        })
        // console.log(userInfo,openId);
    },
    async getUserInfo(){
        //判断用户是否登录
        const data = wx.getStorageSync('userInfo')
        if(data){
            //请求登录数据,更新
            const userInfo=await wx.cloud.database().collection('userInfo').doc(data._id).get()
            this.setData({
                userInfo:userInfo.data
            })
            // console.log(userInfo)
        }else{

        }
    },
    //退出登录
    close(){
        wx.clearStorage()
        this.setData({
            userInfo:null
        })
    },
    //获取用户信息,进入页面触发
    onShow(){
        this.getUserInfo()
    },
    //页面初始化后执行，tabbar页面切换时不会销毁
    onLoad(){
        this.getTabBar().setData({
            active:'mine'
        })
    }
})