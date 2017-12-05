//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          app.getUserInfo(function (userInfo) {
            // console.log(userInfo)
            try {
              wx.setStorageSync('userInfo', userInfo)
              console.log("stored user information")
            } catch (e) {
              console.log("couldn't set storage for avatar")
            }
            wx.request({
              success: function (res) {
                try {
                  wx.setStorageSync('token', res.data.authentication_token)
                  wx.setStorageSync('currentUserId', res.data.id)
                } catch (e) {
                  console.log("Didn't set storage")
                }
              },

              url: 'https://seeme.shanghaiwogeng.com/api/v1/users',
              method: "post",
              data: {
                code: res.code,
                user: {
                  avatar: userInfo.avatarUrl,
                  nickname: userInfo.nickName,
                  language: userInfo.language,
                  gender: userInfo.gender
                }
              }
            })
          })
        } else {
          console.log('error' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
