const api = require('../../utils/http.js')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
// pages/invite/invite.js
const app = getApp()
let user = wx.getStorageSync('userInfo');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    halfId: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    if(options.id != undefined){
      wx.setStorageSync('halfId', options.id)
      // this.setData({halfId: options.id})
    }

    //****处理页面跳转开始 */
    user = wx.getStorageSync('userInfo');
    if(user == ''){
      wx.reLaunch({
        url: '/pages/auth/login/login',
      })
    }else if(user.helfId != null){
      wx.switchTab({
        url: '/pages/index/index'
      })
    }

    // 如果已经关联另一半，则直接进入主页
    this.selectExistHelf();
    //****处理页面跳转结束 */


    this.setData({halfId : wx.getStorageSync('halfId')})
    if(this.data.halfId != ''){
      api.setHalf({helfId: this.data.halfId, id: user.id}).then(res => {
        if(res.status == 200){
          Dialog.alert({
            message: '恭喜你，来到你们两个人的世界 ~',
            theme: 'round-button',
          }).then(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          });
        }
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
    console.log("刷新")
    this.selectExistHelf();
    wx.stopPullDownRefresh();
  },

  selectExistHelf() {
    api.selectLover(user.id).then(res => {
      if(res.data.helf != null){
        // Dialog.alert({
        //   message: '恭喜你，来到你们两个人的世界 ~',
        //   theme: 'round-button',
        // }).then(() => {
        //   wx.switchTab({
        //     url: '/pages/index/index'
        //   })
        // });
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
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
    console.log("userid => ", user.id)
    return {
      // title: '',//分享内容(为空则为当前页面文本)
      path: '/pages/invite/invite?id='+user.id, //分享地址 路径，传递参数到指定页面。(为空则为当前页面路径)
      imageUrl: '',//分享的封面图(为空则为当前页面)
    }

  }
})