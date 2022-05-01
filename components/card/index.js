// components/card/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
      },
    properties: {
        animalData:Object
    },
    data: {

    },
    methods: {
        toInfo(){
            wx.navigateTo({
              url: `/pages/animalInfo/index?id=${this.data.animalData._id}`,
            })
        }
    }
})
