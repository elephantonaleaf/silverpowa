// pages/list_stories/list_stories.js
Page({
  playSound: function() {
    console.log('开始播放')

    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://p07x6aqq9.bkt.clouddn.com/stars.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ currentUser: options.user_id })
    let that = this
    wx.request({
      url: 'http://172.16.96.74:3000/api/v1/users',
      data: { id: that.data.currentUser },
      success: (res) => {
        let user = res.data
        that.setData({ user: user })
      },
      fail: (error) => {
        // log the error
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   let that = this
   wx.request({
     url: 'http://172.16.96.74:3000/api/v1/recordings',
     data: {user_id: that.data.currentUser},
     success: (res) => {
        let stories = res.data
        that.setData({stories: stories})
     },
     fail: (error) => {
        // log the error
     }
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})