// components/card/index.js
Component({
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
