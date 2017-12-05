const qiniuUploader = require("../../utils/qiniuUploader");
//index.js

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptoken: 'PJP0bjvUkPBLO3PmSgAfuVyEh9aTAlzYmiItmRCm:t1BkGo6uRo3VrJ8s7Xm_I_IMJBQ=:eyJzY29wZSI6InNpbHZhcG93YTpteS1ydWJ5LWxvZ28ucG5nIiwiZGVhZGxpbmUiOjE1MTIxMzYxODcsInVwaG9zdHMiOlsiaHR0cDovL3VwLnFpbml1LmNvbSIsImh0dHA6Ly91cGxvYWQucWluaXUuY29tIiwiLUggdXAucWluaXUuY29tIGh0dHA6Ly8xODMuMTMxLjcuMTgiXSwiZ2xvYmFsIjpmYWxzZX0=',
    // uptoken: 'xxxx',
    domain: 'http://p07x6aqq9.bkt.clouddn.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    imageObject: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this;
  },
  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  }
});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'imageObject': res
        });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      }
        // , {
        //     region: 'ECN', // 华东区
        //     uptokenURL: 'PJP0bjvUkPBLO3PmSgAfuVyEh9aTAlzYmiItmRCm:t1BkGo6uRo3VrJ8s7Xm_I_IMJBQ=:eyJzY29wZSI6InNpbHZhcG93YTpteS1ydWJ5LWxvZ28ucG5nIiwiZGVhZGxpbmUiOjE1MTIxMzYxODcsInVwaG9zdHMiOlsiaHR0cDovL3VwLnFpbml1LmNvbSIsImh0dHA6Ly91cGxvYWQucWluaXUuY29tIiwiLUggdXAucWluaXUuY29tIGh0dHA6Ly8xODMuMTMxLjcuMTgiXSwiZ2xvYmFsIjpmYWxzZX0=',
        //     domain: 'http://p07x6aqq9.bkt.clouddn.com',
        //     shouldUseQiniuFileName: false,
        //     key: 'testKeyNameLSAKDKASJDHKAS'
        // }
      );
      console.log(that.data.imageObject)
    }
  })
}
