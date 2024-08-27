/*** 
 * @Author: trexwb
 * @Date: 2024-08-23 14:31:48
 * @LastEditors: trexwb
 * @LastEditTime: 2024-08-23 19:49:49
 * @FilePath: /drive/Users/wbtrex/website/localServer/node/damei/laboratory/microservice/account/src/app/cast/json.js
 * @Description: 
 * @一花一世界，一叶一如来
 * @Copyright (c) 2024 by 杭州大美, All Rights Reserved. 
 */
class CastJson {
  constructor(rules) {
    this.rules = rules;
  }
  get(value) {
    try {
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
        return value;
      } else if (typeof data === 'string') {
        return JSON.parse(value);
      }
      return JSON.parse(JSON.stringify(value || {}));
    } catch (error) {
      return {};
    }
  }

  set(value) {
    try {
      if (typeof value === 'object' && value !== null && Object.keys(value).length > 0) {
        return JSON.stringify(value);
      } else if (typeof data === 'string') {
        return JSON.stringify(value || {});
      }
      return JSON.stringify(value || {});
    } catch (error) {
      return {};
    }
  }
}

module.exports = CastJson;