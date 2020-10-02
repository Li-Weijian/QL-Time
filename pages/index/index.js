const api = require('../../utils/http.js')
//index.js
//获取应用实例
const app = getApp()
let user = wx.getStorageSync('userInfo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lovers: {},
    minDate: new Date(1990, 1, 1).getTime(),
    maxDate: new Date(2025, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    show: false,
  },

  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      show: false
    });

    // 设置在一起的时间
    api.setTogetherTime({id: user.id, togetheTime: new Date(this.data.currentDate)}).then(res => {
      this.onLoad();
    });

  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync('userInfo');
    api.selectLover(user.id).then(res => {
      this.setData({
        lovers: res.data
      })
    })
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