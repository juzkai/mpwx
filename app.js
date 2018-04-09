//app.js

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 监听网络状态变化
    let _this = this;
    wx.onNetworkStatusChange(function (res) {
      _this.toast(`当前为${res.networkType}网络`);
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 向用户发起授权
    if (wx.authorize) {
      wx.authorize({
        scope: 'scope.userInfo',
        success: res => {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        },
        fail: error => {
          console.log(error);
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
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
  toQueryPair: function (key, value) {
    if (typeof value === 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  },
  /**
   * josn转字符串拼接 name="zhangsan"&id="abc"
   */
  toBodyString: function (obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      // key = key;
      let values = obj[key];
      if (values && values.constructor === Array) { // 数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value))
        }
        ret = ret.concat(queryValues);
      } else { // 字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  },
  /**
   *  页面跳转
   */
  go: function (url, data) {
    if (this.globalData.token === '') {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    let params = this.toBodyString(data);
    if (params !== '') {
      params  = '?' + params;
    }
    wx.navigateTo({
      url: `/pages/${url}/${url}` + params,
    })
  },
  /**
   *  post 请求
   */
  post: function (url, data, ok) {
    wx.showLoading({
      title: this.globalData.showLoadingText,
    })
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        ok ? ok(res) : '';
      },
      fail: function (error) {
        console.log(error);
        wx.showToast({
          title: error.errMsg,
          icon: 'none',
          duration: 2000
        })
      },    
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  // /**
  //  *  modal提示框
  //  */
  // showModal: function (msg, options, ok, cancel, complete) {
  //   let defOption = {
  //     showCancel: 'true',
  //     cancelText: '取消',
  //     cancelColor: '#000000',
  //     confirmText: '确定',
  //     confirmColor: '#3CC51F'
  //   };
  //   if (options === 'object') {
  //     defOption.showCancel = options.showCancel || defOption.showCancel;
  //     defOption.cancelText = options.cancelText || defOption.cancelText;
  //     defOption.cancelColor = options.cancelColor || defOption.cancelColor;
  //     defOption.confirmText = options.confirmText || defOption.confirmText;
  //     defOption.confirmColor = options.confirmColor || defOption.confirmColor;
  //   }
  //   wx.showModal({
  //     title: this.globalData.showModalTitle,
  //     content: msg,
  //     showCancel: defOption.showCancel,
  //     cancelText: defOption.cancelText,
  //     cancelColor: defOption.cancelColor,
  //     confirmText: defOption.confirmText,
  //     confirmColor: defOption.confirmColor,
  //     success: function (res) {
  //       if (res.confirm) {
  //         if (options === 'object' && ok) {
  //           ok();
  //         } else if (options === 'function') {
  //           ok();
  //         }
  //       } else if (res.cancel) {
  //         if (options === 'object' && ok && cancel) {
  //           cancel();
  //         } else if (options === 'function' && ok && !cancel && !complete) {
  //           ok();
  //         } else if (options === 'function' && ok && cancel && !complete) {
  //           ok();
  //         }
  //       }
  //     },
  //     complete: function () {
  //       if (options === 'object' && ok && cancel && complete) {
  //         complete();
  //       } else if (options === 'function' && ok && cancel && !complete) {
  //         cancel();
  //       }
  //     }
  //   })
  // },
  // /**
  //  *  alert 提示框
  //  */
  // alert: function (msg, ok) {
  //   this.showModal(msg,function () {
  //     ok ? ok() : '';
  //   })
  // },
  // /**
  //  *  toast模态框
  //  */
  // toast: function (msg) {
  //   wx.showToast({
  //     title: msg,
  //     icon: 'none',
  //     duration: 2000
  //   })
  // },
  /**
   *  全局属性
   */
  globalData: {
    userInfo: null,
    showLoadingText: '加载中',
    showModalTitle: '提示',
    token: ''
  }
})