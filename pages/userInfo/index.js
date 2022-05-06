Page({
    data: {
        userId: '',
        avatarUrl: '',
        nickName: '',
        showAvatarUrl:''
    },
    onLoad() {
        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this.setData({
                userId: userInfo._id
            })

            this.getUserInfo()
        }
    },
    //获取用户信息
    async getUserInfo() {
        const {
            data
        } = await wx.cloud.database().collection('userInfo').doc(this.data.userId).get()
        console.log(data)
        this.setData({
            showAvatarUrl: data.avatarUrl,
            avatarUrl:data.avatarUrl,
            nickName: data.nickName
        })
    },
    //确认修改信息
    async submit() {
        const {
            nickName,
            userId,
            avatarUrl,
            showAvatarUrl
        } = this.data;
        let bufferAvatarUrl=''
        wx.showLoading({
            title: '修改ing。。。',
        })
        if(avatarUrl !== showAvatarUrl){
            bufferAvatarUrl = wx.getFileSystemManager().readFileSync(showAvatarUrl)  //读取本地头像信息

        }
        console.log(bufferAvatarUrl)

        const data = await wx.cloud.callFunction({
            name: 'patchUserInfo',
            data: {
                nickName,
                userId,
                avatarUrl,
                bufferAvatarUrl
                
            }
        })
        wx.hideLoading()
        wx.switchTab({
            url: '/pages/mine/index',
        })
    },
    //更换头像
    async chooseImage() {
        const { tempFiles } = await wx.chooseMedia({
          count:1,
          mediaType:['image'],
          sourceType:['album','camera']
        })
        // console.log(tempFiles[0])
        this.setData({
            showAvatarUrl:tempFiles[0].tempFilePath
        })

        // await wx.cloud.uploadFile({
        //     cloudPath: 'avatarUrl/头像.png',
        //     filePath: tempFiles[0].tempFilePath, // 文件路径-临时地址
        // })
    }
})