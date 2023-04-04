// pages/we/editInfo.js
const api = require('../../utils/http.js')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
let user = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  bindSubmit(e){
    var userInfo = e.detail.value;
    this.setData({
      user: userInfo
    })
    
    api.saveUserInfo(this.data.user).then(res => {
      Toast.success("修改成功");
      if(res.status == 200){
        wx.switchTab({
          url: '/pages/we/we',
        })
      }else {
        Toast.fail(res.message);
      }
    })
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