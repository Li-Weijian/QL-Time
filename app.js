//app.js
import './vendor/weapp-cookie/index'
import accessToken from "./utils/accessToken.js";

App({
  onLaunch: function () {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        var that = this;
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: function (login_res) {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo
                    // 2. 小程序通过wx.request()发送code到开发者服务器
                    accessToken(login_res.code, res.encryptedData, res.iv, res.signature, res.rawData).then(res => {
                      console.log("res : ", res)
                      wx.setStorageSync('userInfo', res.data)
                      //由于这里是网络请求，可能会在 Page.onShow 之后才返回
                      if(res.data.helfId == null){
                        wx.reLaunch({
                          url: '/pages/invite/invite'
                        })
                      }else {
                        wx.reLaunch({
                          url: '/pages/index/index'
                        })
                      }})
    
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }})
      
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})