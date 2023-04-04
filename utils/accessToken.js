const api = require('./http.js');

export default function (code, encryptedData, iv, signature, rawData, sessionKey, openId, sceneCode) {
  return new Promise((resolve, reject) => {
      let params = {
        code,
        encryptedData,
        iv,
        signature,
        rawData,
        sessionKey,
        openId,
        sceneCode
      }
    api.assistantToken(params).then(res => {
      if(res.status==200){
        //同步缓存token
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('name', res.data.nickName)
        wx.setStorageSync('avatarUrl', res.data.avatarUrl)
        resolve(res)
      }
      
    });
  });
}

const uuid = () => { //加密
  let s = [];
  let hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 61), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  return s.join("");
}