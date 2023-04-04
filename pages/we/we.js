// pages/we/we.js
const api = require('../../utils/http.js')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
let user = wx.getStorageSync('userInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lovers: {},
    statistics: {},
    sheetShow: true,
    
  },

  /**
   * 关于
   */
  openInfo: function(e){
    Dialog.alert({
      title: '关于',
      message: "此程序由Liweijian独立开发，如果觉得体验良好，请给我点个赞~",
      // theme: 'round-button',
    }).then(() => {
  })

  },

  /**
   * 解除关系
   */
  clearRelationship: function(e){

    Dialog.confirm({
      title: '确定要解除情侣关系吗？',
      message: "解除关系之后，你们的所有记录将消失，请谨慎操作",
      // theme: 'round-button',
    }).then(() => {
      //确认
      api.clearRelationship().then(res => {
        Dialog.alert({
          message: '最熟悉的陌生人，谢谢你曾经来过。'
        }).then(() => {
          wx.clearStorageSync('userInfo')
          wx.navigateTo({
            url: '/pages/invite/invite',
          })
        });
      })
  })
},

  navigateToPage: function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })

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

    api.selectAllCount().then(res => {
      this.setData({
        statistics: res.data
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