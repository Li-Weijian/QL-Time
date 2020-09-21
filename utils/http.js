
export const API_URI = `http://192.168.31.247:8091`; //开发域名 

// 请求函数
const fetchApi = (type, params, method, after, resType) => {
  return new Promise((resolve, reject) => {
    if (wx.getStorageSync('token')) {
      var header = {
        'content-type': 'application/json',
        // 'Cookie': wx.getStorageSync('token')
      }
    } else {
      var header = {
        'content-type': 'application/json'
      }
    }
    // wx.getStorageSync('accessToken') ? type = `${type.split('?')[0]}?accessToken=${wx.getStorageSync('accessToken')}` : type; //需清除之前的token
    if (after) {
      if (params instanceof Object) {
        type += (type.indexOf('?') < 0 ? '?' : '&') + param(params);
      } else {
        if (params) {
          type = type + "/" + params;
        }
      }
    } //针对参数拼接在url上而非body中的情况
    wx.request({
      data: params,
      url: `${API_URI}${type}`,
      method: method || 'GET',
      header: header,
      timeout: 20000,
      responseType: resType || 'text',
      success: res => {
        // return res ? resolve(res) : gui(res,resolve);  //调试用
      //   if (res.header) {
      //     if ('Set-Cookie' in res.header) {
      //         wx.setStorageSync("token", res.header['Set-Cookie']);
      //     }else if ('set-cookie' in res.header) {
      //         wx.setStorageSync("token", res.header['set-cookie'])
      //     }
      // }
        return res.data.code == 1 ? resolve(res) : gui(res, resolve); //正式用
      },
      fail: err => {
        reject(err)
        console.log(err)
      }
    });
  });
}

function gui(res, reject) {
  if (res.data.status === 10000) {
    // wx.clearStorageSync();
    wx.removeStorageSync('token')
    wx.removeStorageSync('name')
    wx.removeStorageSync('avatarUrl')
    wx.removeStorageSync('adminType')
    wx.showToast({
      title: res.data.message,
      icon:'none',
      duration:1000,
      success() {
        wx.getSetting({
          success: res0 => {
              wx.showModal({
                title: '提示',
                content: '你还没登录，是否去授权登录',
                success (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: '/pages/auth/login/login',
                    })
                  } 
                }
              })
            }
        })
      }
    })
  }
  return reject(res)
}

function param(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

// fetchApi函数第一参数为url，第二个为data，第三为请求方式，第四为是否参数拼接在url后，如要拼接，则填true，默认不填
// 默认为get请求，如果请求为post，需写好参数，在其他页面调用,
//   先const api = require('../../utils/http.js')，后调用api.getList({id:xx}).then(res=>{xxx})f


module.exports = {
  API_URI: API_URI,
  fetchApi:fetchApi,
  gui:gui,
  param:param,

  // 删除某个合同证据文件
  test:params=>{
    return fetchApi(`/noteController/getNoteList`, params, 'POST').then(res => res.data)
  },

  assistantToken: params=>{
    return fetchApi('/user/wxAuth', params, 'POST').then(res => res.data)
  }

}