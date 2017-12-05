App({
  onLaunch: function () {
    // WX code
    let app = this;
    // wx.checkSession({
    //   success: function() {
    //     console.log("success, has account")
    //   },
    //   fail: function() {
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          app.getUserInfo(function (userInfo) {
            // console.log(userInfo)
            // openid  用户的唯一标识
            // nickname  用户昵称
            // sex 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
            // province  用户个人资料填写的省份
            // city  普通用户个人资料填写的城市
            // country 国家，如中国为CN
            // headimgurl  用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
            // privilege 用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
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
