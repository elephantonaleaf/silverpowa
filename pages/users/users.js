// pages/users/users.js.js
Page({

  clickButton: function () {

    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://p0juu2tk1.bkt.clouddn.com/dombrance.mp3')
    this.audioCtx.play()

    // wx.navigateTo({
    //   url: '../playing/playing'
    // })
  },
  /**
   * 页面的初始数据
   */
  data: {
    array: [
      'How my childhood was',
      'How I managed my marriage',
      'How I brought up my children',
      'My best memory',
      'A place I like',
      'A person who changed me',
      'One regret I have',
      'My earliest memory',
      'How I met my partner'
    ],

    stories: ([
      {
        topic: 'How my childhood was',
        content: '#',
        user: {
          username: 'Granpa Wang',
          avatar: '../../imgs/ned.jpeg',
        }
      },
      {
        topic: 'How I managed my marriage', content: '#',
        user: {
          username: 'Tywin',
          avatar: '../../imgs/tywin.jpeg',
        }
      },
      {
        topic: 'How I brought up my children', content: '#',
        user: {
          username: 'Gandalf',
          avatar: '../../imgs/gandalf.jpeg',
        }
      }
    ])
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let topic = e.detail.value
//Call api to get stories with topic
    let stories = {}

    wx.request({
      url: 'http://silvapowa.herokuapp.com/api/v1/recordings',
      data: {topic: topic}, 
      success: (res) => {
        let stories = res.data
        that.setData({ stories: stories })
      },
      fail: (error) => {
        // log the error
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'http://silvapowa.herokuapp.com/api/v1/recordings',
      success: (res) => {
        console.log(res)
        let stories = res.data
        that.setData({ stories: stories })
      },
      fail: (error) => {
        // log the error
      }
    })
    wx.request({
      url: 'http://silvapowa.herokuapp.com/api/v1/users',
      success: (res) => {
        console.log(res)
        let users = res.data
        that.setData({ users: users })
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