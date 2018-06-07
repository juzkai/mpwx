//index.js
import { APP_SERVE_URL, APP_API} from '../../resources/js/config.js';
var dialog = require('../../resources/js/dialog.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.token === '') {
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    //   return;
    // }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toHome: function () {
    app.go('home');
  },
  getLocation: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  toItem1: function () {
    app.post(APP_SERVE_URL + APP_API.query, {
      id: 1
    }, function (response) {
      console.log(response);
      dialog.alert(JSON.stringify(response));
    })
  },
  toItem2: function () {
    app.go('about', { name: 'abc' });
  },
  /**
   *  获取x系统信息
   */
  getSystemInfo: function () {
    wx.getSystemInfo({
      success: function (res) {
        dialog.alert(JSON.stringify(res));
      }
    })
  },
  /**
   *  获取系统信息同步接口
   */
  getSystemInfoSync: function () {
    try {
      var res = wx.getSystemInfoSync();
      dialog.alert(JSON.stringify(res));
    } catch (e) {
      // Do something when catch error
    }
  },
  /**
   *  获取网络类型
   */
  getNetworkType: function () {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        dialog.toast(networkType);
      }
    })
  },
  /**
   *  使手机发生较长时间的振动（400ms）
   */
  vibrateLong: function () {
    wx.vibrateLong();
  },
  /**
   *  使手机发生较短时间的振动（15ms）
   */
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '18262283481' //仅为示例，并非真实的电话号码
    })
  },
  /**
   *  从本地相册选择图片或使用相机拍照。
   */
  chooseImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        dialog.alert(JSON.stringify(res), function () {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths; // Arrray
          // 预览图片
          wx.previewImage({
            urls: tempFilePaths, // Array
          })
        });
      }
    })
  },
  /**
   *  调起客户端扫码界面，扫码成功后返回对应的结果
   */
  scanCode: function () {
    wx.scanCode({
      // onlyFromCamera: true, // 只允许从相机扫码
      success: res => {
        // res.result; // 所扫码的内容
        // res.scanType; // 所扫码的类型 二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’
        // res.charSet; // 所扫码的字符集
        // res.path; // 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
        dialog.alert(JSON.stringify(res));
      },
      fail: error => {
        dialog.alert(`识别失败${JSON.stringify(error)}`);
      }
    })
  },
  /**
   *  开始罗盘
   */
  startCompass: function () {
    wx.startCompass({
      success: () => {
        dialog.alert('开始罗盘');
      }
    });
    wx.onCompassChange(function (res) {
      dialog.toast(res.direction.toString());
    })
  },
  /**
   *  停止监听罗盘
   */
  stopCompass: function () {
    wx.stopCompass();
  },
  /**
   *  跳转到列表页面
   */
  toListPage: function () {
    app.go('list');
  }
})
