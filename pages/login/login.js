//login.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
   *  表单提交
   */
  formSubmit: function (e) {
    let formData = e ? e.detail.value : '';
    wx.showToast({
      title: '登录成功',
      icon: 'none',
      duration: 2000
    })
    setTimeout(function () {
      app.globalData.token = '6cde117ec442e1cc0e5f01de6d369b8e';
      wx.navigateBack({ delta: 1 });
    }, 2000)
  },
  /**
   *  点击密码输入框-键盘右下角‘完成’按钮时触发
   */
  loginConfirm: function (e) {
    app.alert(JSON.stringify(e.detail));
    // this.formSubmit();
  }
})