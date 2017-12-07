const qiniuUploader = require("../../utils/qiniuUploader");

const options = {
  region: 'ECN', // 华东区
  uptoken: 'PJP0bjvUkPBLO3PmSgAfuVyEh9aTAlzYmiItmRCm:O3-vvlrJEGCnKK4jrpaHcOPOFc4=:eyJzY29wZSI6InNpbHZhcG93YSIsImRlYWRsaW5lIjoxNTEyNjM1MjM0LCJ1cGhvc3RzIjpbImh0dHA6Ly91cC5xaW5pdS5jb20iLCJodHRwOi8vdXBsb2FkLnFpbml1LmNvbSIsIi1IIHVwLnFpbml1LmNvbSBodHRwOi8vMTgzLjEzMS43LjE4Il0sImdsb2JhbCI6ZmFsc2V9',
  domain: 'http://p07x6aqq9.bkt.clouddn.com',
  shouldUseQiniuFileName: true,
  // key: 'test.silk'
};

function initQiniu() {
  qiniuUploader.init(options);
}

var filePath;
var timeStop = false;
var app = getApp();


Page({
  data: {
    
    array: ['Pick a topic',
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
    index: 0,
    width: 1,
    timeLeft: 60,
    startAngle: -(1 / 2 * Math.PI),
    endAngle: 3 / 2 * Math.PI,
    xAngle: Math.PI / 30,
    voiceObject: {}
  },
  startRecording: function () {
    var that = this;
    console.log("recording....")
    // RECORDING
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        filePath = res.tempFilePath;
        console.log(filePath);
      },
      fail: function (res) {
        //录音失败
        console.log("failure");
      }
    })

    that.setData({
      timeLeft: 60
    });
    
    var cxt_arc = wx.createContext();
    var endAngle = that.data.endAngle;
    var xAngle = that.data.xAngle;
    var templeAngle = that.data.startAngle;
    var rander = function () {
      if (templeAngle >= endAngle) {
        return;
      } else if (templeAngle + xAngle > endAngle) {
        templeAngle = endAngle;
      } else {
        templeAngle += xAngle
      }
      cxt_arc.beginPath();
      cxt_arc.setStrokeStyle('red')
      cxt_arc.arc(150, 100, 70, that.data.startAngle, templeAngle);
      cxt_arc.stroke();
      cxt_arc.closePath();
      wx.drawCanvas({
        canvasId: 'countDown',
        actions: cxt_arc.getActions()
      });


      // requestAnimationFrame(rander);
    }
    var time = 60;
    var shit = setInterval(runTime, 1000);

    function runTime() {
      if (time == 0 || timeStop) {
        clearInterval(shit);
      } else {
        console.log(time);
        console.log(that.data.timeLeft);
        time = time - 1;
        that.setData({
          timeLeft: time - 1
        });

        rander();
      }
    }
    setTimeout(function () {
      //结束录音
      wx.stopRecord()
    }, 600000)

  },
  stopRecording: function () {
    wx.stopRecord();
    timeStop = true;
  },
  playRecording: function () {
    // wx.downloadFile({
    //   url: 'http://p07x6aqq9.bkt.clouddn.com/FuR9fPPXRh6VeMtGa13ogdAvbao4', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     console.log("imhere")
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //       wx.playVoice({
    //         filePath: res.tempFilePath,
    //         success: function () {
    //           console.log("imhere")
    //         }
    //       })
    //     }
    //   }
    // })
    wx.playVoice({
      filePath: filePath,
      complete: function () {
      }
    })
  },
  
  saveRecording: function (e) {

    // FIRST, SAVE THE SOUND FILE (.SILK) TO QINIU
    initQiniu();
    console.log("**************QINIU**************")
    var that = this
    qiniuUploader.upload(filePath, (res) => {
      that.setData({
        'imageObject': res
      });
      var recording = {
          "user_id": app.globalData.currentUserId,
          "content": that.data.imageObject.imageURL,
          "topic": that.data.array[that.data.index]
      }
      var token = wx.getStorageSync('token')
      // SECOND, POST THE RECORD ON THE BACKEND
      console.log(recording)
      wx.request({
        url: "http://172.16.96.74:3000/api/v1/recordings", //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
          recording
        },
        header: {
          'Content-Type': 'application/json',
          'X-User-Token': token
        },
        success: function (res) {
          try {
            wx.setStorageSync('topic', res.data.topic),
              wx.setStorageSync('content', res.data.content)

            wx.showToast({
              title: '🎉 Uploaded! 🎉',
              icon: 'success',
              duration: 3000,
              complete: function() {
                setTimeout(function() {
                  wx.reLaunch({
                    url: '../choice/choice'
                  })
                },2000)
              }
            })
      
          } catch (e) {
            console.log("Didn't set storage")
          }

        }
      })      

    }, (error) => {
      console.error('error: ' + JSON.stringify(error));
    }, options
    );

  

  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // countdown(this);
    // var that = this;
    // move(that);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var context = wx.createContext();

    // //第二步绘制这里我们绘制个矩形
    // //x, y, widht, height
    // context.rect(50, 50, 100);
    // //绘制的样式进行描边绘制，fill为填充位置
    // context.stroke();
    // /**
    //  *  调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    //  *
    //  *    注意convasId可以为数字表示也可以用字符串表示，就是一个绘制对象的标识，并且可以指定多个
    //  *    actions 是从context上下文中获取的绘制行为，即为第二步操作
    //  */

    // wx.drawCanvas({
    //   //画布标识，传入<canvas/>的cavas-id
    //   canvasId: 'countDown',
    //   //获取绘制行为， 就相当于你想做到菜context.getActions()就是食材
    //   actions: context.getActions(),
    //  },


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
