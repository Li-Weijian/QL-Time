// pages/memory/publish.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const api = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    imgResult: [],
    buttonText: '保存记忆',
    loadModal: false,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 保存记忆
  saveMemory() {
    this.setData({disabled: true, buttonText: '日常发表中..'})
    
    api.saveMemory(this.data.imgResult).then(res => {
      if(res.status == 200){
        wx.redirectTo({
          url: '/pages/memory/memory',
        })
      }else {
        Toast.fail(res.message);
      }
    })

  },

  ChooseImage() {
    wx.chooseImage({
      count: 18, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
      
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths),
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths,
          })
        }
        // 上传
        this.setData({loadModal: true})
        this.uploadimg({
          url: '/tops/uploadTopsImages', 
          path: res.tempFilePaths
        })
      }
    });
  },

  uploadimg(data, formData) {
    var that = this,
    i = data.i ? data.i : 0, //当前上传的哪张图片
    success = data.success ? data.success : 0, //上传成功的个数
    fail = data.fail ? data.fail : 0; //上传失败的个数
    wx.uploadFile({
      url: api.API_URI + data.url,
      filePath: data.path[i],
      name: 'file',  //这里根据自己的实际情况改
      formData: formData,  //这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;  //图片上传成功，图片上传成功的变量+1
        const result = JSON.parse(resp.data)
        this.setData({
          imgResult:this.data.imgResult.concat(result.data[0]),
        })
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++; //图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++; //这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) { //当图片传完时，停止调用          
          console.log('成功：' + success + " 失败：" + fail);
          this.setData({loadModal: false})
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {

    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })

    this.data.imgResult.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgResult: this.data.imgResult
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