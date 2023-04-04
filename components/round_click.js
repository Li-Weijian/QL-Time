// components/round_click.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bindtap_method: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    redirectTo: function(){
      this.triggerEvent('redirectToPage');//如果需要传递参数，直接写在triggerEvent的参数里即可    
    }
   

  }
})
