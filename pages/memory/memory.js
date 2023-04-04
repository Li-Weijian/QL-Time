// pages/memory/memory.js
const api = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noramalData: [],
    count: 0,
    leftList: [],
    rightList: [],
    leftHight: 0,
    rightHight: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    api.getMemoryList().then(res => {
      if (res.status == 200){

        let noramalData = []
        let galleryList = res.data.galleryList;
        galleryList.forEach(element => {
          let image = {};
          image.Cover = element.url + '?x-oss-process=image/auto-orient,1/quality,q_60';
          image.CoverHeight = element.imageHeight;
          image.CoverWidth = element.imageWidth;
          noramalData.push(image);
        });

        this.setData({noramalData: noramalData, count: res.data.count})
        this.drawImages();
      }
    })
  },

  // 预览图片
  previewImage(e) {
    let current = e.currentTarget.dataset.url;
    let galleryList = this.data.noramalData.map(item => {
      return item.Cover;
    })
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: galleryList // 需要预览的图片http链接列表
    })
  },

  // 跳转发布页面
  toPublish(){
    wx.redirectTo({
      url: '/pages/memory/publish',
    })
  },

  // 绘制图片
  drawImages(){
    var that = this;
    var allData = that.data.noramalData;
    //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
    var leftH = that.data.leftHight;
    var rightH = that.data.rightHight;
    var leftData = [];
    var rightData = [];
    for (let i = 0; i < allData.length; i++) {
      var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
      allData[i].CoverHeight = currentItemHeight + "rpx";//因为xml文件中直接引用的该值作为高度，所以添加对应单位
      if (leftH == rightH || leftH < rightH) {//判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
        leftData.push(allData[i]);
        leftH += currentItemHeight;
      } else {
        rightData.push(allData[i]);
        rightH += currentItemHeight;
      }
    }

    //更新左右两栏的数据以及累计高度
    that.setData({
      leftHight: leftH,
      rightHight: rightH,
      leftList: leftData,
      rightList: rightData
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
