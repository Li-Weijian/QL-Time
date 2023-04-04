// pages/explore/visit_record.js
const api = require('../../../utils/http')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    visitRecordList:[],
    pageSize: 20,
    pageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getVisitRecordList({pageNo: this.data.pageNo, pageSize: this.data.pageSize}).then(res => {
      if (res.status == 200){
        this.setData({visitRecordList: res.data.records})
        this.setData({pageNo : this.data.pageNo + 1})
      }
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

  },

  visitRecordDetail: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/explore/visit_record/visit_record_detail?id=' + id,
    })
  },


  // 跳转到发布
  toPublish: function(){
    wx.redirectTo({
      url: '/pages/explore/visit_record/visit_record_publish',
    })

  }
})