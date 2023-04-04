// pages/explore/next_visit/next_visit_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    address: {
      addrName: "",
      longitude : 0,
      latitude: 0,
      address: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.showSelector()
    
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

  // 提交表单
  bindSubmit(e){
    console.log(e.detail.value);
  
  },

   // 显示组件
   showSelector() {
    wx.chooseLocation({success: res => {
      const address = {
        addrName: res.name,
        longitude : res.longitude,
        latitude: res.latitude,
        address: res.address
      }
      this.setData({address: address})
    }});
  }
})