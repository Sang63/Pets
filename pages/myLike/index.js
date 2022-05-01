Page({
    data: {
        ageSort:'desc',
        animalLikeList:[],
        userInfo:''
    },
    //切换排序
    changeSort(){
        const { ageSort }=this.data
        this.setData({
            ageSort:ageSort==='desc'?'asc':'desc'
        })
    },
    onLoad(){
        const userInfo=wx.getStorageSync('userInfo');
        this.setData({
            userInfo
        })
        if(userInfo){
            this.getLikeList()
        }
    },
    async getLikeList(){
        const { userInfo, ageSort } = this.data
        const { result: { data }} = await wx.cloud.callFunction({
          name: 'getLikeList',
          data: {
            id: userInfo._id,
            sort: ageSort
          }
        })
        console.log(data)
        this.setData({
          animalLikeList: data
        })
      },
})