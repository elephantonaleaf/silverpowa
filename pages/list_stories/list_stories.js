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
    stories: [
      { 
        topic: 'How my childhood was',
        content: '#',
        listeners: [
          { avatar: '../../imgs/tywin.jpeg' },
          { avatar: '../../imgs/albus.jpeg' },
          { avatar: '../../imgs/chat.png' }
        ]
      },  
      {
        topic: 'How I managed my marriage', content: '#',
        listeners: [
          { avatar: '../../imgs/karl.jpeg' },
          { avatar: '../../imgs/gandalf.jpeg' },
          { avatar: '../../imgs/chat.png' }
        ] },
      {
        topic: 'How I brought up my children', content: '#',
        listeners: [
          { avatar: '../../imgs/albus.jpeg' },
          { avatar: '../../imgs/karl.jpeg' },
          { avatar: '../../imgs/tywin.jpeg' },
          { avatar: '../../imgs/chat.png' }
        ] 
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   let that = this
   wx.request({
     url: 'https://bonfire.shanghaiwogeng.com/api/v1/recordings',
     data: {user: 3},
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