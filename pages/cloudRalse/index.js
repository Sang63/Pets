// Page({
//     data: {

//     },

//     onLoad(){
//         this.getTabBar().setData({
//             active:'cloudRalse'
//         })
//     }
// })
Page({
    data: {
        animalList: [],
        userInfo: "",
        text: ''
    },
    onLoad() {
        this.getTabBar().setData({
            active: 'cloudRalse'
        })
    },
    onShow() {
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo
        })
        if (userInfo) {
            this.getRalseList()
        }
    },
    //获取宠物详情
    async getRalseList() {
        const {
            userInfo,
            text
        } = this.data

        const {
            result: {
                data
            }
        } = await wx.cloud.callFunction({
            name: 'getRalseList',
            data: {
                id: userInfo._id,
                text
            }
        })
        console.log(data)
        this.setData({
            animalList: data
        })
    },
})