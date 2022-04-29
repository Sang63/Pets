// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db=cloud.database()

// 云函数入口函数
exports.main = async (event) => {
    const {id}=event

    const animal=db.collection('animal')

    const {data}=await animal.doc(id).get()

    return {
        data
    }
}