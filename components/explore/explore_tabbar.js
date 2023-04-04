// pages/explore/component/explore_tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBar: [
      {
        "pagePath": "/pages/explore/visit_record/visit_record",
        "text": "探店记录",
        "iconPath": "/assets/images/24gf-camera3.png"
      },
      {
        "pagePath": "/pages/explore/random_visit",
        "text": "随机探店",
        "iconPath": "/assets/images/get.png"
      },
      {
        "pagePath": "/pages/explore/next_visit",
        "text": "下次探什么",
        "iconPath": "/assets/images/favor.png"
      }
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _toVisitRecord(){
      wx.redirectTo({
        url: '/pages/explore/visit_record',
      })
    },

    _toRandomVisit(){
      wx.redirectTo({
        url: '/pages/explore/random_visit',
      })
    },

    _toNextVisit(){
      wx.redirectTo({
        url: '/pages/explore/next_visit',
      })
    }
  }
})
