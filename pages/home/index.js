// pages/home/index.js
Page({
    data: {

    },
    // 页面初始化执行一次
    onLoad(){
        this.getTabBar().setData({
            active:'home'
        })
    }
})