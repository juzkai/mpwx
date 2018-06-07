//dialog.js 封装modal模态框 统一管理
/**
 *  modal模态框
 */
function showModal(msg, options, ok, cancel, complete) {
  let title = getApp().globalData.showModalTitle;
  let defOption = {
    showCancel: 'true',
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#3CC51F'
  };
  if (options === 'object') {
    defOption.showCancel = options.showCancel || defOption.showCancel;
    defOption.cancelText = options.cancelText || defOption.cancelText;
    defOption.cancelColor = options.cancelColor || defOption.cancelColor;
    defOption.confirmText = options.confirmText || defOption.confirmText;
    defOption.confirmColor = options.confirmColor || defOption.confirmColor;
  }
  wx.showModal({
    title: title,
    content: msg,
    showCancel: defOption.showCancel,
    cancelText: defOption.cancelText,
    cancelColor: defOption.cancelColor,
    confirmText: defOption.confirmText,
    confirmColor: defOption.confirmColor,
    success: function (res) {
      if (res.confirm) {
        if (typeof options === 'object' && ok) {
          ok();
        } else if (typeof options === 'function') {
          options();
        }
      } else if (res.cancel) {
        if (typeof options === 'object' && ok && cancel) {
          cancel();
        } else if (typeof options === 'function' && ok && !cancel && !complete) {
          ok();
        } else if (typeof options === 'function' && ok && cancel && !complete) {
          ok();
        }
      }
    },
    complete: function () {
      if (typeof options === 'object' && ok && cancel && complete) {
        complete();
      } else if (typeof options === 'function' && ok && cancel && !complete) {
        cancel();
      }
    }
  })
}
/**
 *  alert提示框
 */
function alert(msg, ok) {
  showModal(msg, function () {
    ok ? ok() : '';
  })
}
/**
 *  toast
 */
function toast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
module.exports.showModal = showModal;
module.exports.alert = alert;
module.exports.toast = toast;