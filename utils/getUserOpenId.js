const api = require('./http.js');
const app = getApp();

export default function (_this) {
   return new Promise((resolve, reject) => {
      let params = {
        code: _this.globalData.loginCode
      }
      api.getUserOpenId(params).then(res => { //获取openId
        _this.globalData.openid = res.data.openid;
        _this.globalData.sessionKey = res.data.sessionKey;
        resolve(res)
      });
   });
}