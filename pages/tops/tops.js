// pages/tops/tops.js
const api = require('../../utils/http.js')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

let user = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    isCard: true,
    dialogShow: false, 
    context: '', 
    isLoad: false,
    flag: "", //0： 说说， 1：评论
    page: 0, //请求第几页
    pageSize: 5, //每页请求的数量
    total: 0, //总共的数据条数
    list: [],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync('userInfo');
    this.getTopsList();
  },

  // 获取约定列表
  getTopsList() {
    let offset = (this.data.page) * this.data.pageSize;
    this.setData({isLoad: true});
    api.selectTopsList({offset: offset, limit: this.data.pageSize}).then(res => {
      if (res.data == null || res.data.length === 0) {
        // 加载结束
        this.setData({isLoad: false});
        return;
      }
      this.setData({list: this.data.list.concat(res.data)})
    })
  },

  // 保存评论
  saveContext(e) {
    api.doCommont({
      content: this.data.context,
      topId: this.data.id,
      flag: this.data.flag
    }).then(res => {
      wx.redirectTo({
        url: '/pages/tops/tops',
      })
    })
  },

  // 预览图片
  previewImage(e){
    let url = e.currentTarget.dataset.url;
    let galleryList = e.currentTarget.dataset.gallerylist;
    galleryList = galleryList.map(item => {
      return item.url;
    })

    wx.previewImage({
      current: url,  // 当前显示图片的http链接
      urls: galleryList // 需要预览的图片http链接列表
    })
  },

  // 删除
  deleteTops(){
    api.deleteTops({
      topsId: this.data.id,
      flag: this.data.flag
    }).then((response) => {
      wx.redirectTo({
        url: '/pages/tops/tops',
      })
    });
  },

  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },

  // 跳转发布页面
  toPublish(){
    wx.redirectTo({
      url: '/pages/tops/publish',
    })
  },

  cancelDialog(){
    this.setData({context: ''})
  },

  // 显示评论框
  showDialog(e){
    this.setData({
      dialogShow: true,
      id: e.currentTarget.dataset.id,
      flag: e.currentTarget.dataset.flag
    })
  },

  // 长按
  handleLongPress(e){
    let userId = e.currentTarget.dataset.userid;
    if(userId == user.id){
      this.showAndDeteleTops(e);
    }else {
      Toast('只允许操作自己的评论哟');
    }
  }, 

  // 显示删除确认框并删除
  showAndDeteleTops(e){
    let that = this;
    Dialog.confirm({
      title: '删除内容',
      message: '确定要删除该内容吗',
    }).then(() => {
      that.setData({
        id: e.currentTarget.dataset.id,
        flag: e.currentTarget.dataset.flag
      })
      this.deleteTops();
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
    this.setData({
      page: this.data.page+1,
    })
    this.getTopsList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})