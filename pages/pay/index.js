Page({
    data: {
        userId: '',
        animalId: '',
        animalInfo: {},
        goodsList: [],
        checked: false,
        totalPrice: 0,
    },
    //获取宠物信息
    async getAnimalInfo() {
        const {
            animalId
        } = this.data
        const {
            data
        } = await wx.cloud.database().collection('animal').doc(animalId).get()
        // console.log(data)
        this.setData({
            animalInfo: data
        })
    },
    onLoad({
        id
    }) {
        const userInfo = wx.getStorageSync("userInfo")
        console.log(userInfo)
        this.setData({
            userId: userInfo._id,
            animalId: id
        })
        this.getAnimalInfo()
        this.getGoodsList()
    },
    //获取商品列表
    async getGoodsList() {
        const {
            result: {
                data
            }
        } = await wx.cloud.callFunction({
            name: 'getGoodsList'
        })
        data.map(item => {
            item.checked = false;
            item.value = 1;
        })
        this.setData({
            goodsList: data
        })
        // console.log(data)
    },
    //全选 ｜｜ 取消全选
    allChoose() {
        const {
            checked,
            goodsList
        } = this.data;
        goodsList.map((item) => {
            if (item.amount > 0) {
                item.checked = !checked
            }
        })
        this.setData({
            checked: !checked,
            goodsList
        })
        this.countTotal()
    },
    //合计   父子组件交互
    sum({
        detail
    }) {
        const {
            checked,
            value,
            _id
        } = detail
        const {
            goodsList
        } = this.data;
        goodsList.map(item => {
            if (item._id === _id) {
                item.checked = checked;
                item.value = value
            }
        })
        this.countTotal()
        // console.log(checked,value,_id)
    },
    countTotal() {
        let {
            goodsList,
            totalPrice
        } = this.data
        totalPrice = 0
        goodsList.forEach(item => {
            if (item.checked) {
                totalPrice += (item.value * item.price)
            }
        })
        this.setData({
            totalPrice: totalPrice * 100
        })
    },
    //下单支付
    async pay() {
        const {
            goodsList,
            userId,
            totalPrice,
            animalId
        } = this.data;

        const payData = goodsList.filter(item => item.checked).map(item => ({
            _id: item._id,
            num: item.value
        }))

        if (payData.length > 0) {
            const { result } = await wx.cloud.callFunction({
                name: 'postPay',
                data: {
                    payData,
                    totalPrice: totalPrice / 100,
                    userId,
                    animalId
                }
            })
            console.log(result)

            // result.code && wx.redirectTo({
            //     url: '/pages/cloudRalse/index',
            // })
            if(result.code===200){
                wx.switchTab({
                  url: '/pages/cloudRalse/index',
                })
            }

            wx.showToast({
                icon: 'none',
                title: result.message,
            })
        }
    },
})