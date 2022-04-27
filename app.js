// app.js
App({
    onLaunch(){
        wx.cloud.init({
            env: 'pro-3gmnthbe12273885',  //当前环境ID
            traceUser: true,
          })          
    }
})
