// pages/auth/login/login.js
import accessToken from "../../../utils/accessToken.js";

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  },

  /**
   * 授权登录
   */
  getUserInfo(e) {
    const userInfo = e.detail.userInfo
    if (userInfo) {
      // 1. 小程序通过wx.login()获取code
      wx.login({
        success: function (login_res) {
          //获取用户信息
          wx.getUserInfo({
            success: function (info_res) {
              // 2. 小程序通过wx.request()发送code到开发者服务器
              accessToken(login_res.code, info_res.encryptedData, info_res.iv, info_res.signature, info_res.rawData).then(res => {
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
                }

            
                if (app.accessTokenCallback) {
                  app.accessTokenCallback(res);
                }
              })
            }
          })
        }
      })
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }

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