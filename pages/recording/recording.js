//this is what i tried to count down the numbers
// function countdown(that) {
//   var second = that.data.second
//   if (second == 0) {
//     // console.log("Time Out...");
//     that.setData({
//       second: "Time Out..."
//     });
//     return;
//   }
//   var time = setTimeout(function () {
//     that.setData({
//       second: second - 1
//     });
//     countdown(that);
//   }
//     , 1000)
// }
var filePath;
var timeStop = false;

//this is what i was testing a moving bar
// function move(that) {
//   var w = 1;
//   var id = setInterval(frame, 100);
//   function frame() {
//     if (w >= 100) {
//       clearInterval(id);
//     } else {
//       w++;
//       that.setData({
//         width: w + '%'
//       })
//     }
//   }
// }
Page({
  startRecording: function () {
    var that = this;
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
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        filePath = res.tempFilePath;
      },
      fail: function (res) {
        //录音失败
      }
    })
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 600000)
    //animation of the countdown
    
    
  },
  stopRecording: function () {
    wx.stopRecord();
    timeStop = true;
  },
  playRecording: function () {
    wx.playVoice({
      filePath: filePath,
      complete: function () {
      }
    })
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    array: ['Pick a topic you want to talk about',
      'Whats your childhood like', 
      'How did you maintein your marriage relationship', 
      'How did you educate your son', 
      'How did you educate your grandson', 
      'How did you make your career choice'
    ],
    index: 0,
    width: 1,
    timeLeft: 60,
    // 开始角度
    startAngle: -(1 / 2 * Math.PI),
    // 结束角度
    endAngle: 3 / 2 * Math.PI,
    // 偏移角度
    xAngle: Math.PI / 30
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