// 云函数入口文件
const cloud = require('wx-server-sdk')

/*指定云函数环境*/
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
//event：前端传给后端的字段
exports.main = async (event) => {
    const {
        nickName,
        avatarUrl
    } = event
    const {
        OPENID
    } = cloud.getWXContext()

    //如果当前用户注册过，可直接返回当前用户信息（登录）
    //初始化集合
    const db = cloud.database()
    //指定集合
    const userInfo = db.collection('userInfo')
    //查询当前用户是否注册过
    const {
        data
    } = await userInfo.where({
        _openid: OPENID
    }).get()
    if (data.length === 0) {
        //注册
        //数据库内新增数据
        const {_id} = await userInfo.add({
            data: {
                nickName,
                avatarUrl,
                money: 0,
                loveValue: 0,
                message: 0,
                _openid: OPENID
            }
        })
        //doc:接受下划线id，快速返回该id的数据
        const user=await userInfo.doc(_id).get()
        return{
            data:user
        }
    } else {
        //直接登录
        return{
            data:data[0]
        }
    }
}