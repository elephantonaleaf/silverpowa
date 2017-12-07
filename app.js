//app.js
App({
  onLaunch: function () {
    let app = this;
    // 登录

    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
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
              url: 'http://172.16.96.74:3000/api/v1/users',
              method: "post",
              data: {
                code: res.code,
                user: {
                  avatar: userInfo.avatarUrl,
                  nickname: userInfo.nickName,
                  language: userInfo.language,
                  gender: userInfo.gender
                }
              },
              success: function (res) {
                try {
                  wx.setStorageSync('token', res.data.authentication_token)
                  wx.setStorageSync('currentUserId', res.data.id)
                } catch (e) {
                  console.log("Didn't set storage")
                }
              }
            })
          })
        } else {
          console.log('error' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        // withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})