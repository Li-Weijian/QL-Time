// pages/explore/visit_record/visit_record_detail.js
const api = require('../../../utils/http')
const app = getApp();
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';


Page({

  data: {
    cardCur: 0,
    recordId: "",
    lastId: "",
    // 探店记录详情
    visitRecordDetail: {},
    // 图片列表
    swiperList: [],
    // 评论列表
    commentList: [],
    // 当前用户
    userInfo: {},


    // 评论
    comment:"",
    // 评论类型: COMMENT 评论， REPLAY 评论的评论
    commentType: "COMMENT",
    commentPlaceholder: "快来评论一下吧~",
    // 是否展示保存按钮
    showSaveButton: false,
    // 评论输入框焦点
    commentInputFocus: false,
    // 回复用户
    replayUserId: "",
    // 回复的父id
    lastId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化towerSwiper 传已有的数组名即可

    this.towerSwiper('swiperList');
    this.setData({recordId: options.id, lastId: options.id, userInfo: app.globalData.lovers.myself})
    this.getVisitRecordDetail(options.id);
    this.getVisitRecordComment(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  setCommentInputFocusToTrue() {
    this.setData({commentInputFocus: true})
  },


  /**
   * 回复评论，获取输入框焦点
   * @param {} e 
   */
  replayComment(e) {
    this.setData({
      replayUserId: e.currentTarget.dataset.replayuserid,
      lastId: e.currentTarget.dataset.id,
      commentType: "REPLAY",
      commentInputFocus: true,
      commentPlaceholder: "回复@" + e.currentTarget.dataset.username+"："
    })
  },

  /**
   * 评论
   * @param {} e 
   */
  doComment(e){
    
    let comment =  {
      "content": this.data.comment,
      "userId": this.data.userInfo.id,
      "recordId": this.data.recordId,
      "type": this.data.commentType,
      "replayUserId": this.data.replayUserId,
      "lastId": this.data.lastId
    }

    api.doVisitRecordCommont(comment).then(res => {
      Toast("评论成功~");
      this.getVisitRecordComment(this.data.recordId);
      this.clearCommentState();
    })
  },

   /**
   * 清除评论状态
   */
  clearCommentState(e){

      this.setData({ 
        commentType: "COMMENT",
        commentPlaceholder: "快来评论一下吧~",
        showSaveButton: false,
        comment: "", 
        replayUserId: null
      })

  },

  
  /**
   * 获取探店详情
   * @param {探店id} id 
   */
  getVisitRecordDetail(id) {
    if(id!=null || id != undefined){
      api.getvisitRecordDetail({recordId: id}).then(res => {
        this.setData({
            visitRecordDetail: res.data,
            swiperList: res.data.imageList
          })
      })
    }
  },

  /**
   * 获取探店评论列表
   * @param {探店记录ID} id 
   */
  getVisitRecordComment(id){
    if(id!=null || id != undefined){

      api.getVisitRecordComment({recordId: id}).then(res => {
        this.setData({
            commentList: res.data
          })
      })
    }

  },

  // 显示保存按钮
  showSaveButton(e){
    let comment = e.detail.value.trim();
    this.setData({showSaveButton: comment.length != 0, comment: comment})
    console.log(comment.length);
    if(comment.length == 0){
      this.clearCommentState();
    }
  },

  // 长按评论或者回复
  handleLongPress(e){
    let commentid = e.currentTarget.dataset.commentid;
    this.showAndDeteleTops(commentid);
  },

   // 显示删除确认框并删除
   showAndDeteleTops(commentid){
     console.log(commentid);
    Dialog.confirm({
      title: '删除内容',
      message: '确定要删除该内容吗',
    }).then(() => {
      api.deleteVisitRecordComment(commentid).then(res => {
        Toast.success(res.message);
        this.getVisitRecordComment(this.data.recordId);
        
      })
    })
  },



 
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
})