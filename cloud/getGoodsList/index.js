// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const goods = cloud.database()

exports.main = async (event) => {
    const { data } = await goods.collection('goods').where({}).get() 
    return {
        data
    }
}