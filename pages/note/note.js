// pages/note/note.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const api = require('../../utils/http.js')
let user = null;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    id: '',
    cardCur: 0,
    loadModal: false,
    sheetShow: false,
    dialogShow: false,
    isLoad: false,
    page: 0, //请求第几页
    pageSize: 10, //每页请求的数量
    total: 0, //总共的数据条数
    noteList: [],
    isComplete: '',
    actions: [{
        name: '修改'
      },{
        name: '修改完成状态'
      },{
        name: '删除'
      }
    ],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/src%3Dhttp___img.jj20.com_up_allimg_512_100512123610_121005123610-8-1200.jpg%26refer%3Dhttp___img.jj20.jpeg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/d9fcb449fa428b1cc001b40527b99076.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://lovezz-app.oss-cn-shenzhen.aliyuncs.com/webImg/0.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user = wx.getStorageSync('userInfo');
  
    this.towerSwiper('swiperList');
    this.getNoteList();
  },

  // 获取约定列表
  getNoteList() {
    let offset = (this.data.page) * this.data.pageSize;
    if (offset <= 0) {
      offset = 0;
    }
    this.setData({isLoad: true});
    api.getNoteList({
      offset: offset,
      limit: this.data.pageSize
    }).then(res => {
      if (res == null || res.length === 0) {
        // 加载结束
        this.setData({isLoad: false});
        return;
      }
      this.setData({
        loadModal: false,
        noteList: this.data.noteList.concat(res)
        // noteList: res
      })
      
    });
  },

  // 设置输入内容
  contextInput(e) {
    this.setData({
      context: e.detail.value
    })
  },

  // 保存
  saveContext(e) {
    this.setData({
      loadModal: true
    })
    api.savaOrUpdateContent({
      context: this.data.context,
      userId: user.id,
      id: this.data.id
    }).then(res => {
      if (res) {
        this.setData({
          loadModal: false
        });
        wx.redirectTo({
          url: '/pages/note/note',
        })
      }
    })
  },

  onCancel() {
    this.setData({
      sheetShow: false
    });
  },

  openTab(e) {
    this.setData({
      sheetShow: true, 
      id: e.currentTarget.dataset.id,
      isComplete: e.currentTarget.dataset.iscomplete
    });
  },

  onChange(e){
    this.setData({context: e.detail})
  },

  onSelect(e) {
    this.setData({
      sheetShow: false
    });
    let op = e.detail.name;
    if (op == '修改') {
      api.selectNote(this.data.id).then(res => {
        this.setData({context: res.data.context})
      })

      this.setData({
        dialogShow: true
      })
    }else if (op == '修改完成状态'){
      let message = '';

      if (this.data.isComplete == '1'){
        message = '宝贝，确认要修改为未完成吗？';
      }else {
        message = "宝贝，确定完成该约定了吗？";
      }

      Dialog.confirm({
        title: '修改完成状态',
        message: message,
        // theme: 'round-button',
      }).then(() => {
        //确认
        if (this.data.isComplete == '1'){
          this.setData({
            isComplete: '0'
          })
        }else if (this.data.isComplete == '0'){
          this.setData({
            isComplete: '1'
          })
        }
        this.completeNote();
      })
    }else if (op == '删除'){
      Dialog.confirm({
        title: '删除约定',
        message: '确定要删除该约定吗？'
      }).then(() => {
        //确认
        this.deleteNote();
      })
    }else {
      this.$toast("操作未识别");
    }
  },

  // 修改完成状态
  completeNote() {
    api.savaOrUpdateContent({
      isComplete: this.data.isComplete,
      id: this.data.id,
    }).then((res) => {
      wx.redirectTo({
        url: '/pages/note/note',
      })
    }) .catch(() => {
      // on cancel
    });;
  },

  // 删除约定
  deleteNote(){
    api.savaOrUpdateContent({
      isDelete: '1',
      id: this.data.id,
    }).then((res) => {
      wx.redirectTo({
        url: '/pages/note/note',
      })
    });
  },

  cancelDialog() {
    this.setData({
      context: ''
    });
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
    this.setData({page: ++this.data.page});
    this.getNoteList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})