Component({
    properties: {
        goodsData:Object
    },
    data: {

    },
    methods: {
        changeChecked(){
            const {goodsData}=this.data
            goodsData.checked=!goodsData.checked
            this.setData({
                goodsData
            })
            //父组件向子组件传递事件
            this.triggerEvent('sum',{
                _id:goodsData._id,
                checked:goodsData.checked,
                value:goodsData.value
            })
        },
        changeValue(e){
            const {goodsData}=this.data
            // console.log(e)
            goodsData.value=e.detail
            this.setData({
                goodsData
            })
            //父组件向子组件传递事件
            this.triggerEvent('sum',{
                _id:goodsData._id,
                checked:goodsData.checked,
                value:goodsData.value
            })
        }
    }
})
